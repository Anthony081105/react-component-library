import React from 'react';
import gradientColor from './gradient';

const configure = {
    colors:[''],
};

export const ConfigContext = React.createContext(configure);

interface ConfigProviderProps {
    children: React.ReactChild;
    colors?: string[];// 必须传入#XXX格式的颜色样式
};

export const ConfigProvider: React.FC<ConfigProviderProps> = (props) => {
    const {
        children,
        colors,
    } = props;

    if (colors) {
        let gradientColors = gradientColor(colors[0],colors[1],4);
        configure.colors = gradientColors;
    }
    

    return (
        <ConfigContext.Provider value={configure}>
            {children}
        </ConfigContext.Provider>
    );
};

export default ConfigProvider;
