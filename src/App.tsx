import React from 'react';
import Button, {ButtonType, ButtonSize} from './components/Button/button';


export const ButtonPage = () => (
  <div>
    <div>
      <p>基础 Button</p>
      <div>
        <Button onClick={()=>{console.log('点击！')}}>Hello World</Button>
        <Button disabled>Disabled Button</Button>
        <Button  size={ButtonSize.Large} className='testClassName'>
          Large Button
        </Button>
        <Button  size={ButtonSize.Large} btnType={ButtonType.Primary}>
          Large Primary Button
        </Button>
        <Button  size={ButtonSize.Large} btnType={ButtonType.Danger}>
          Large DangerButton
        </Button>
        <Button  size={ButtonSize.Small}>
          Small Button
        </Button>
        <Button btnType={ButtonType.Link} href="https://www.baidu.com" target='_blank'>
          Link Button
        </Button>
        <Button btnType={ButtonType.Link} href="https://www.baidu.com" disabled>Disabld Link Button</Button>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <div className="App">
      <ButtonPage/>
    </div>
  );
}

export default App;
