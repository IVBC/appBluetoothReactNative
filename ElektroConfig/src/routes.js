import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Steps from './pages/Steps';

const Routes = createAppContainer(
    createStackNavigator(
        {
            Main,
            Steps,
        },
        {
            headerLayoutPreset: 'center',
            headerBackTitleVisible: false,
            defaultNavigationOptions: {
                headerStyle: {
                    backgroundColor: '#0061a8',
                },
                headerTintColor: '#FFF',
            },
        }
    )
);

export default Routes;
