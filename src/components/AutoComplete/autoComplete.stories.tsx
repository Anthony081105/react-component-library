import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { AutoComplete, DataSourceType } from './autoComplete'

interface LakerPlayerProps {
  value: string;
  number: number;
}
interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}
const AsyncAutoComplete = () => {

  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({ items }) => {
        console.log(items)
        const formatItems =  items.slice(0, 10).map((item: any) => ({ value: item.login, ...item}))
        return formatItems
      })
  }
  const renderOption = (item: DataSourceType) => {
    const itemWithGithub = item as DataSourceType<GithubUserProps>
    return (
      <>
        <b>Name: {itemWithGithub.value}</b>
        <span>url: {itemWithGithub.url}</span>
      </>
    )
  }
  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action('selected')}
      renderOption={renderOption}
    />
  )
}

const createFakeList = (length)=>{
  let res = [];
  for(let i = 0;i<length;i++){
    res.push({value:`1${i}`,number:i})
  }
  return res;
}
const lakersWithNumber = [
  {value: 'bradley', number: 11},
  {value: 'pope', number: 1},
  {value: 'caruso', number: 4},
  {value: 'cook', number: 2},
  {value: 'cousins', number: 15},
  {value: 'james', number: 23},
  {value: 'AD', number: 3},
  {value: 'green', number: 14},
  {value: 'howard', number: 39},
  {value: 'kuzma', number: 0},
  {value: 'abradley', number: 111},
  {value: 'apope', number: 11},
  {value: 'acaruso', number: 14},
  {value: 'acook', number: 12},
  {value: 'acousins', number: 115},
  {value: 'ajames', number: 123},
  {value: 'aAD', number: 13},
  {value: 'agreen', number: 114},
  {value: 'ahoward', number: 139},
  {value: 'akuzma', number: 101},
  {value: 'aabradley', number: 1111},
  {value: 'aapope', number: 111},
  {value: 'aacaruso', number: 141},
  {value: 'aacook', number: 121},
  {value: 'aacousins', number: 1151},
  {value: 'aajames', number: 1231},
  {value: 'aaAD', number: 131},
  {value: 'aagreen', number: 1141},
  {value: 'aahoward', number: 1391},
  {value: 'aakuzma', number: 101},
]
const SimpleComplete = () => {

  const handleFetch = (query: string) => {
    // return lakersWithNumber.filter(player => player.value.includes(query))
    return createFakeList(1000).filter(player => player.value.includes(query));
  }
  const renderOption = (item: DataSourceType) => {
    const itemWithNumber = item as DataSourceType<LakerPlayerProps>
    return (
      <>
        <b>当前值: {itemWithNumber.value}</b>
        <span>当前列索引号: {itemWithNumber.number}</span>
      </>
    )
  }
  return (
    <AutoComplete
      maxSize={10}
      fetchSuggestions={handleFetch}
      onSelect={action('selected')}
      renderOption={renderOption}
    />
  )
}

const SelfRenderAutoComplete = () => {
  // 筛选目的内容
  const handleFetch = (query: string) => {
    return lakersWithNumber.filter(player => player.value.includes(query))
  }
  // 自定义渲染
  const renderOption = (item: DataSourceType) => {
    const itemWithNumber = item as DataSourceType<LakerPlayerProps>
    return (
      <>
        <b>名字: {itemWithNumber.value}</b>
        <span>球衣号码: {itemWithNumber.number}</span>
      </>
    )
  }
  return (
    <AutoComplete 
      fetchSuggestions={handleFetch}
      onSelect={action('selected')}
      placeholder="输入湖人队球员英文,自定义下拉模版"
      renderOption={renderOption}
    />
  )
}

storiesOf('AutoComplete Component', module)
  .add('AutoComplete', SimpleComplete)
  .add('自定义渲染请求列表格式', SelfRenderAutoComplete)
  .add('异步请求案例', AsyncAutoComplete)
