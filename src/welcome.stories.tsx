import React from "react";
import { storiesOf } from "@storybook/react";
import ConfigProvider from "./components/ConfigProvider";
import Button from "./components/Button";
import Alert from "./components/Alert/alert";
import AutoComplete, {
  DataSourceType,
} from "./components/AutoComplete/autoComplete";
import Icon from "./components/Icon/icon";
import Input from "./components/Input/input";
import Progress from "./components/Progress";
import Upload, { UploadFile } from "./components/Upload/upload";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";




export const DefaultMenu = () => (
    <div>
      <Menu>
        <MenuItem>
          cool link
        </MenuItem>
        <MenuItem disabled>
          disabled
        </MenuItem>
        <MenuItem>
          cool link 2
        </MenuItem>
        <SubMenu title="下拉选项">
          <MenuItem>
            下拉选项一
          </MenuItem>
          <MenuItem>
            下拉选项二
          </MenuItem>
        </SubMenu>
      </Menu>
    </div>
  )
  
  export const MenuWithVertical = () => (
    <Menu mode="vertical"  >
      <MenuItem>
        cool link
      </MenuItem>
      <MenuItem>
        cool link 2
      </MenuItem>
      <SubMenu title="点击下拉选项">
        <MenuItem>
          下拉选项一
        </MenuItem>
        <MenuItem>
          下拉选项二
        </MenuItem>
      </SubMenu>
    </Menu>
  )
  
  export const MenuWithOpened = () => (
    <Menu mode="vertical" defaultOpenSubMenus={['2']}  >
      <MenuItem>
        cool link
      </MenuItem>
      <MenuItem>
        cool link 2
      </MenuItem>
      <SubMenu title="默认展开下拉选项">
        <MenuItem>
          下拉选项一
        </MenuItem>
        <MenuItem>
          下拉选项二
        </MenuItem>
      </SubMenu>
    </Menu>
  )
// 上传前检测文件大小  直接返回布尔值
const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 100) {
    alert("file too big");
    return false;
  }
  return true;
};

// 上传前 改变文件名 返回 promise
const filePromise = (file: File) => {
  const newFile = new File([file], "new_name.docx", { type: file.type });
  return Promise.resolve(newFile);
};

const defaultFileList: UploadFile[] = [
  {
    uid: "123",
    size: 1234,
    name: "hello.md",
    status: "uploading",
    percent: 40,
  },
  { uid: "122", size: 1234, name: "yzk.md", status: "success" },
  { uid: "1211", size: 1234, name: "test.md", status: "error" },
];

const SimpleUpload = () => {
  return (
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      beforeUpload={checkFileSize}
      defaultFileList={defaultFileList}
    >
      <Button size="lg" btnType="primary">
        <Icon icon="upload" /> 不能传大于100Kb！{" "}
      </Button>
    </Upload>
  );
};

const DrageUpload = () => {
  return (
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      defaultFileList={defaultFileList}
      beforeUpload={filePromise}
      name="fileName"
      data={{ key: "value" }}
      headers={{ "X-Powered-By": "cherryship" }}
      accept=".jpg"
      multiple
      drag
    >
      <Icon icon="upload" size="5x" theme="secondary" />
      <br />
      <p>Drag file over to upload</p>
    </Upload>
  );
};

const WithTextProcess = () => <Progress percent={50} showText={false} />;

const StrokeHeightProcess = () => (
  <div style={{ marginBottom: 10 }}>
    <div style={{ marginBottom: 10 }}>
      <Progress percent={20} strokeHeight={20} />
    </div>
    <div style={{ marginBottom: 10 }}>
      <Progress percent={50} strokeHeight={50} />
    </div>
    <div style={{ marginBottom: 10 }}>
      <Progress percent={70} strokeHeight={70} />
    </div>
  </div>
);
const DifThemesProcess = () => (
  <div style={{ marginBottom: 10 }}>
    <Progress percent={10} styles={{ marginBottom: 3 }} />
    <Progress percent={20} styles={{ marginBottom: 3 }} theme="secondary" />
    <Progress percent={30} styles={{ marginBottom: 3 }} theme="warning" />
    <Progress percent={40} styles={{ marginBottom: 3 }} theme="info" />
    <Progress percent={50} styles={{ marginBottom: 3 }} theme="dark" />
    <Progress percent={60} styles={{ marginBottom: 3 }} theme="danger" />
    <Progress percent={70} styles={{ marginBottom: 3 }} theme="light" />
    <Progress percent={100} styles={{ marginBottom: 3 }} theme="success" />
  </div>
);

const DefaultIcon = () => (
  <>
    <Icon icon="check" size="3x" />
    <Icon icon="anchor" size="3x" />
    <Icon icon="trash" size="3x" />
    <Icon icon="times" size="3x" />
    <Button btnType="primary" disabled={false} size="lg">
      <Icon icon="check" />
      check
    </Button>
  </>
);

const IconWithTheme = () => (
    <div style={{ marginBottom: 10 }}>
      <Icon icon="check" size="3x" theme="primary" />
      <Icon icon="info" size="3x" theme="secondary" />
      <Icon icon="tree" size="3x" theme="success" />
      <Icon icon="umbrella" size="3x" theme="info" />
      <Icon icon="exclamation-circle" size="3x" theme="warning" />
      <Icon icon="spinner" size="3x" spin theme="danger" />
    </div>
);

const IconWithAction = () => (
  <>
    <Icon icon="spinner" size="3x" spin theme="primary" />
    <Icon icon="spinner" pulse size="3x" theme="success" />
  </>
);
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
      .then((res) => res.json())
      .then(({ items }) => {
        console.log(items);
        const formatItems = items
          .slice(0, 10)
          .map((item: any) => ({ value: item.login, ...item }));
        return formatItems;
      });
  };
  const renderOption = (item: DataSourceType) => {
    const itemWithGithub = item as DataSourceType<GithubUserProps>;
    return (
      <>
        <b>Name: {itemWithGithub.value}</b>
        <span>url: {itemWithGithub.url}</span>
      </>
    );
  };
  return (
    <AutoComplete fetchSuggestions={handleFetch} renderOption={renderOption} />
  );
};

const createFakeList = (length) => {
  let res = [];
  for (let i = 0; i < length; i++) {
    res.push({ value: `1${i}`, number: i });
  }
  return res;
};
const lakersWithNumber = [
  { value: "bradley", number: 11 },
  { value: "pope", number: 1 },
  { value: "caruso", number: 4 },
  { value: "cook", number: 2 },
  { value: "cousins", number: 15 },
  { value: "james", number: 23 },
  { value: "AD", number: 3 },
  { value: "green", number: 14 },
  { value: "howard", number: 39 },
  { value: "kuzma", number: 0 },
  { value: "abradley", number: 111 },
  { value: "apope", number: 11 },
  { value: "acaruso", number: 14 },
  { value: "acook", number: 12 },
  { value: "acousins", number: 115 },
  { value: "ajames", number: 123 },
  { value: "aAD", number: 13 },
  { value: "agreen", number: 114 },
  { value: "ahoward", number: 139 },
  { value: "akuzma", number: 101 },
  { value: "aabradley", number: 1111 },
  { value: "aapope", number: 111 },
  { value: "aacaruso", number: 141 },
  { value: "aacook", number: 121 },
  { value: "aacousins", number: 1151 },
  { value: "aajames", number: 1231 },
  { value: "aaAD", number: 131 },
  { value: "aagreen", number: 1141 },
  { value: "aahoward", number: 1391 },
  { value: "aakuzma", number: 101 },
];
const SimpleComplete = () => {
  const handleFetch = (query: string) => {
    // return lakersWithNumber.filter(player => player.value.includes(query))
    return createFakeList(1000).filter((player) =>
      player.value.includes(query)
    );
  };
  const renderOption = (item: DataSourceType) => {
    const itemWithNumber = item as DataSourceType<LakerPlayerProps>;
    return (
      <>
        <b>当前值: {itemWithNumber.value}</b>
        <span>当前列索引号: {itemWithNumber.number}</span>
      </>
    );
  };
  return (
    <AutoComplete
      maxSize={10}
      fetchSuggestions={handleFetch}
      renderOption={renderOption}
    />
  );
};

const SelfRenderAutoComplete = () => {
  // 筛选目的内容
  const handleFetch = (query: string) => {
    return lakersWithNumber.filter((player) => player.value.includes(query));
  };
  // 自定义渲染
  const renderOption = (item: DataSourceType) => {
    const itemWithNumber = item as DataSourceType<LakerPlayerProps>;
    return (
      <>
        <b>名字: {itemWithNumber.value}</b>
        <span>球衣号码: {itemWithNumber.number}</span>
      </>
    );
  };
  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      placeholder="输入湖人队球员英文,自定义下拉模版"
      renderOption={renderOption}
    />
  );
};
const ColorConfigPage = () => (
  <ConfigProvider colors={["#fff","#000"]}>
    <>
      <h4>按钮 Button</h4>
      <>
        <div style={{ marginBottom: 10 }}>
          <Button size="lg">Large button</Button>
          <Button>Defualt button</Button>
          <Button size="sm">Small button</Button>
        </div>
        <div style={{ marginBottom: 10 }}>
          <Button btnType="primary">Primary button</Button>
          <Button btnType="default">Default Button</Button>
          <Button btnType="danger">Danger button</Button>
          <Button btnType="link" href="https://google.com">
            Link button
          </Button>
        </div>
        <div style={{ marginBottom: 10 }}>
          <Button btnType="primary" disabled>
            Primary button
          </Button>
          <Button btnType="default" disabled>
            Default Button
          </Button>
          <Button btnType="danger" disabled>
            Danger button
          </Button>
          <Button btnType="link" href="https://google.com" disabled>
            Link button
          </Button>
        </div>
      </>
      <hr />
      <h4>警告提示 Alert</h4>
      <>
        <div style={{ marginBottom: 10 }}>
          <Alert closable title="this is alert!" type="primary" />
          <Alert type="success" closable title="this is Success" />
          <Alert type="danger" closable title="this is Danger!" />
          <Alert type="warning" closable={false} title="this is Warning!" />
        </div>
        <div style={{ marginBottom: 10 }}>
          <Alert
            type="primary"
            closable
            title="提示标题"
            children="this is a long description"
            onClose={function noRefCheck() {}}
          />
        </div>
      </>
      <hr />
      <h4>输入框 Input</h4>
      <>
        <div style={{ marginBottom: 10 }}>
          <Input style={{ width: "300px" }} placeholder="placeholder" />
          <Input
            style={{ width: "300px" }}
            placeholder="disabled input"
            disabled
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <Input
            style={{ width: "300px" }}
            placeholder="disabled input"
            disabled
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <Input
            style={{ width: "300px" }}
            placeholder="input with icon"
            icon="search"
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <Input
            style={{ width: "300px" }}
            defaultValue="large size"
            size="lg"
          />
          <Input
            style={{ width: "300px" }}
            placeholder="small size"
            size="sm"
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <Input
            style={{ width: "300px" }}
            defaultValue="prepend text"
            prepend="https://"
          />
          <Input
            style={{ width: "300px" }}
            defaultValue="google"
            append=".com"
          />
        </div>
      </>
      <hr />
      <h4>自动完成输入框 AutoComplete</h4>
      <>
        <div style={{ marginBottom: 10 }}>
          <SimpleComplete />
        </div>
        <div style={{ marginBottom: 10 }}>
          <SelfRenderAutoComplete />
        </div>
        <div style={{ marginBottom: 10 }}>
          <AsyncAutoComplete />
        </div>
      </>
      <hr />
      <h4>图标 Icon</h4>
      <>
        <div style={{ marginBottom: 10 }}>
          <DefaultIcon />
          <IconWithAction />
          <IconWithTheme></IconWithTheme>
        </div>
      </>
      <hr />
      <h4>菜单 Menu</h4>
      <>
        <div style={{ marginBottom: 10 }}>
          <DefaultMenu />
          <MenuWithVertical />
          <MenuWithOpened></MenuWithOpened>
        </div>
      </>
      <hr />
      <h4>进度条 Progress</h4>
      <>
        <div style={{ marginBottom: 10 }}>
          <WithTextProcess />
          <StrokeHeightProcess></StrokeHeightProcess>
          <DifThemesProcess />
        </div>
      </>
      <hr />
      <h4>上传 Upload</h4>
      <>
        <div style={{ marginBottom: 10 }}>
          <SimpleUpload />
          <DrageUpload />
        </div>
      </>
      <hr />
    </>
  </ConfigProvider>
);

storiesOf("Welcome", module).add(
  "welcome",
  () => {
    return <ColorConfigPage />;
  },
  { info: { disable: true } }
);
