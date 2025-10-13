# React Native Interview Questions - 7 Years Experience Level (Senior Full-Stack Developer)

## Core React Native Fundamentals

1. **What is React Native and how does it differ from React?**
   React Native is a framework for building native mobile applications using React. Unlike React for web, it uses native components instead of HTML elements and bridges to native APIs for platform-specific functionality.

2. **How does React Native bridge work?**
   The bridge is a communication layer between JavaScript and native code. It serializes data, passes it between threads, and deserializes it on the other side, allowing JavaScript to call native functions and vice versa.

3. **What are the differences between React Native and native development?**
   - **React Native**: Cross-platform, JavaScript-based, faster development, shared codebase
   - **Native**: Platform-specific, better performance, full platform access, separate codebases

4. **Explain the React Native architecture**
   - **JavaScript Thread**: Runs React code and business logic
   - **Native Thread**: Runs native UI components
   - **Bridge**: Communication layer between threads
   - **Shadow Thread**: Layout calculations

## Components and Navigation

5. **What are the main differences between React Native components and web components?**
   - Use `View` instead of `div`
   - Use `Text` instead of `span` or `p`
   - Use `Image` instead of `img`
   - Use `ScrollView` instead of `overflow: scroll`
   - Style with StyleSheet instead of CSS

6. **How do you handle navigation in React Native?**
   ```javascript
   // React Navigation v6
   import { NavigationContainer } from '@react-navigation/native';
   import { createStackNavigator } from '@react-navigation/stack';
   
   const Stack = createStackNavigator();
   
   function App() {
     return (
       <NavigationContainer>
         <Stack.Navigator>
           <Stack.Screen name="Home" component={HomeScreen} />
           <Stack.Screen name="Details" component={DetailsScreen} />
         </Stack.Navigator>
       </NavigationContainer>
     );
   }
   ```

7. **What are the different types of navigation in React Native?**
   - **Stack Navigator**: Screen-by-screen navigation
   - **Tab Navigator**: Bottom or top tab navigation
   - **Drawer Navigator**: Side drawer navigation
   - **Material Top Tabs**: Swipeable tabs

## State Management

8. **How do you manage state in React Native applications?**
   - **Local State**: useState, useReducer for component state
   - **Global State**: Context API, Redux, Zustand, MobX
   - **Persistent State**: AsyncStorage, SQLite, Realm

9. **How do you implement Redux in React Native?**
   ```javascript
   import { createStore, applyMiddleware } from 'redux';
   import { Provider } from 'react-redux';
   import thunk from 'redux-thunk';
   
   const store = createStore(rootReducer, applyMiddleware(thunk));
   
   function App() {
     return (
       <Provider store={store}>
         <NavigationContainer>
           <AppNavigator />
         </NavigationContainer>
       </Provider>
     );
   }
   ```

10. **How do you handle offline data synchronization?**
    ```javascript
    import NetInfo from '@react-native-community/netinfo';
    import AsyncStorage from '@react-native-async-storage/async-storage';
    
    class OfflineManager {
      async syncData() {
        const isConnected = await NetInfo.fetch().then(state => state.isConnected);
        
        if (isConnected) {
          const offlineData = await AsyncStorage.getItem('offlineData');
          if (offlineData) {
            await this.uploadOfflineData(JSON.parse(offlineData));
            await AsyncStorage.removeItem('offlineData');
          }
        }
      }
      
      async saveOfflineData(data) {
        const existingData = await AsyncStorage.getItem('offlineData');
        const newData = existingData ? [...JSON.parse(existingData), data] : [data];
        await AsyncStorage.setItem('offlineData', JSON.stringify(newData));
      }
    }
    ```

## Performance Optimization

11. **How do you optimize React Native app performance?**
    - Use FlatList for large lists
    - Implement lazy loading
    - Optimize images with proper sizing
    - Use Hermes JavaScript engine
    - Implement code splitting
    - Use Flipper for debugging

12. **How do you handle memory leaks in React Native?**
    ```javascript
    useEffect(() => {
      const subscription = NetInfo.addEventListener(state => {
        console.log('Connection type', state.type);
      });
      
      return () => subscription();
    }, []);
    
    // Clean up timers
    useEffect(() => {
      const timer = setInterval(() => {
        // Some operation
      }, 1000);
      
      return () => clearInterval(timer);
    }, []);
    ```

13. **How do you implement lazy loading in React Native?**
    ```javascript
    import { lazy, Suspense } from 'react';
    
    const LazyComponent = lazy(() => import('./LazyComponent'));
    
    function App() {
      return (
        <Suspense fallback={<LoadingSpinner />}>
          <LazyComponent />
        </Suspense>
      );
    }
    ```

## Platform-Specific Code

14. **How do you write platform-specific code in React Native?**
    ```javascript
    import { Platform, StyleSheet } from 'react-native';
    
    const styles = StyleSheet.create({
      container: {
        paddingTop: Platform.OS === 'ios' ? 20 : 25,
        backgroundColor: Platform.OS === 'ios' ? '#fff' : '#f0f0f0',
      },
    });
    
    // Platform-specific components
    const MyComponent = Platform.select({
      ios: () => require('./MyComponentIOS'),
      android: () => require('./MyComponentAndroid'),
    })();
    ```

15. **How do you handle platform-specific APIs?**
    ```javascript
    import { NativeModules, Platform } from 'react-native';
    
    const { RNCamera } = NativeModules;
    
    const openCamera = async () => {
      if (Platform.OS === 'ios') {
        // iOS-specific camera implementation
        return await RNCamera.openCameraIOS();
      } else {
        // Android-specific camera implementation
        return await RNCamera.openCameraAndroid();
      }
    };
    ```

## Native Modules and Libraries

16. **How do you create a custom native module?**
    ```javascript
    // JavaScript side
    import { NativeModules } from 'react-native';
    
    const { CustomModule } = NativeModules;
    
    export default {
      showAlert: (message) => CustomModule.showAlert(message),
    };
    
    // iOS (Objective-C)
    #import <React/RCTBridgeModule.h>
    
    @interface CustomModule : NSObject <RCTBridgeModule>
    @end
    
    @implementation CustomModule
    
    RCT_EXPORT_MODULE();
    
    RCT_EXPORT_METHOD(showAlert:(NSString *)message)
    {
      dispatch_async(dispatch_get_main_queue(), ^{
        UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"Alert" message:message preferredStyle:UIAlertControllerStyleAlert];
        UIAlertAction *okAction = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault handler:nil];
        [alert addAction:okAction];
        [[UIApplication sharedApplication].keyWindow.rootViewController presentViewController:alert animated:YES completion:nil];
      });
    }
    
    @end
    ```

17. **How do you integrate third-party native libraries?**
    - **iOS**: Add to Podfile and run `pod install`
    - **Android**: Add to `build.gradle` and sync
    - **Auto-linking**: Most libraries support auto-linking
    - **Manual linking**: For older libraries or custom setup

## Testing

18. **How do you test React Native applications?**
    ```javascript
    // Unit Testing with Jest
    import { render, fireEvent } from '@testing-library/react-native';
    import MyComponent from '../MyComponent';
    
    test('renders correctly', () => {
      const { getByText } = render(<MyComponent />);
      expect(getByText('Hello World')).toBeTruthy();
    });
    
    // Integration Testing with Detox
    describe('Login Flow', () => {
      it('should login successfully', async () => {
        await element(by.id('email-input')).typeText('test@example.com');
        await element(by.id('password-input')).typeText('password');
        await element(by.id('login-button')).tap();
        await expect(element(by.id('welcome-screen'))).toBeVisible();
      });
    });
    ```

19. **How do you implement E2E testing?**
    ```javascript
    // Detox configuration
    module.exports = {
      testRunner: 'jest',
      runnerConfig: 'e2e/config.json',
      configurations: {
        'ios.sim.debug': {
          binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/MyApp.app',
          build: 'xcodebuild -workspace ios/MyApp.xcworkspace -scheme MyApp -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build',
          type: 'ios.simulator',
          device: {
            type: 'iPhone 12',
          },
        },
      },
    };
    ```

## Build and Deployment

20. **How do you build React Native apps for production?**
    ```bash
    # iOS
    cd ios && xcodebuild -workspace MyApp.xcworkspace -scheme MyApp -configuration Release -destination generic/platform=iOS -archivePath MyApp.xcarchive archive
    
    # Android
    cd android && ./gradlew assembleRelease
    ```

21. **How do you implement CodePush for over-the-air updates?**
    ```javascript
    import codePush from 'react-native-code-push';
    
    const App = () => {
      useEffect(() => {
        codePush.sync({
          updateDialog: true,
          installMode: codePush.InstallMode.IMMEDIATE,
        });
      }, []);
      
      return <AppNavigator />;
    };
    
    export default codePush(App);
    ```

22. **How do you handle app signing and certificates?**
    - **iOS**: Provisioning profiles, certificates in Xcode
    - **Android**: Keystore files, signing configs in build.gradle
    - **Automation**: Fastlane for automated signing and deployment

## Advanced React Native Concepts (7+ Years Experience)

23. **How would you implement a custom React Native renderer?**
    ```javascript
    class CustomRenderer {
      constructor() {
        this.components = new Map();
        this.rootContainer = null;
      }
      
      createElement(type, props, ...children) {
        return {
          type,
          props: {
            ...props,
            children: children.length === 1 ? children[0] : children
          }
        };
      }
      
      render(element, container) {
        this.rootContainer = container;
        this.renderElement(element, container);
      }
      
      renderElement(element, container) {
        if (typeof element === 'string' || typeof element === 'number') {
          container.appendChild(document.createTextNode(element));
          return;
        }
        
        const { type, props } = element;
        const { children, ...otherProps } = props;
        
        if (typeof type === 'function') {
          const component = new type(props);
          const rendered = component.render();
          this.renderElement(rendered, container);
        } else {
          const nativeElement = this.createNativeElement(type, otherProps);
          
          if (children) {
            if (Array.isArray(children)) {
              children.forEach(child => this.renderElement(child, nativeElement));
            } else {
              this.renderElement(children, nativeElement);
            }
          }
          
          container.appendChild(nativeElement);
        }
      }
      
      createNativeElement(type, props) {
        // Platform-specific native element creation
        if (Platform.OS === 'ios') {
          return this.createIOSElement(type, props);
        } else {
          return this.createAndroidElement(type, props);
        }
      }
    }
    ```

24. **How would you implement a custom React Native bridge for complex data types?**
    ```javascript
    // JavaScript side
    import { NativeModules, NativeEventEmitter } from 'react-native';
    
    const { CustomBridge } = NativeModules;
    const bridgeEmitter = new NativeEventEmitter(CustomBridge);
    
    class AdvancedBridge {
      static async sendComplexData(data) {
        try {
          const result = await CustomBridge.processComplexData(JSON.stringify(data));
          return JSON.parse(result);
        } catch (error) {
          console.error('Bridge error:', error);
          throw error;
        }
      }
      
      static subscribeToEvents(callback) {
        return bridgeEmitter.addListener('CustomEvent', callback);
      }
      
      static async streamData(dataStream) {
        return new Promise((resolve, reject) => {
          const subscription = this.subscribeToEvents((event) => {
            if (event.type === 'stream_complete') {
              subscription.remove();
              resolve(event.data);
            } else if (event.type === 'stream_error') {
              subscription.remove();
              reject(new Error(event.error));
            }
          });
          
          CustomBridge.startDataStream(JSON.stringify(dataStream));
        });
      }
    }
    
    // iOS Implementation
    @interface CustomBridge : NSObject <RCTBridgeModule>
    @end
    
    @implementation CustomBridge
    
    RCT_EXPORT_MODULE();
    
    RCT_EXPORT_METHOD(processComplexData:(NSString *)jsonData
                      resolver:(RCTPromiseResolveBlock)resolve
                      rejecter:(RCTPromiseRejectBlock)reject)
    {
      NSError *error;
      NSDictionary *data = [NSJSONSerialization JSONObjectWithData:[jsonData dataUsingEncoding:NSUTF8StringEncoding] options:0 error:&error];
      
      if (error) {
        reject(@"JSON_ERROR", @"Failed to parse JSON", error);
        return;
      }
      
      // Process complex data
      NSDictionary *result = [self processData:data];
      
      NSData *jsonResult = [NSJSONSerialization dataWithJSONObject:result options:0 error:&error];
      if (error) {
        reject(@"JSON_ERROR", @"Failed to serialize result", error);
        return;
      }
      
      resolve([[NSString alloc] initWithData:jsonResult encoding:NSUTF8StringEncoding]);
    }
    
    - (NSDictionary *)processData:(NSDictionary *)data {
      // Complex data processing logic
      return @{@"processed": @YES, @"result": data};
    }
    
    @end
    ```

25. **How would you implement a custom React Native navigation system?**
    ```javascript
    class CustomNavigationManager {
      constructor() {
        this.navigationStack = [];
        this.navigationHistory = [];
        this.currentRoute = null;
        this.listeners = new Set();
      }
      
      navigate(routeName, params = {}) {
        const route = { name: routeName, params, timestamp: Date.now() };
        
        this.navigationHistory.push(this.currentRoute);
        this.navigationStack.push(route);
        this.currentRoute = route;
        
        this.notifyListeners('navigate', route);
      }
      
      goBack() {
        if (this.navigationStack.length > 1) {
          const previousRoute = this.navigationHistory.pop();
          this.navigationStack.pop();
          this.currentRoute = previousRoute;
          
          this.notifyListeners('goBack', previousRoute);
        }
      }
      
      reset(routeName, params = {}) {
        this.navigationStack = [{ name: routeName, params, timestamp: Date.now() }];
        this.navigationHistory = [];
        this.currentRoute = this.navigationStack[0];
        
        this.notifyListeners('reset', this.currentRoute);
      }
      
      subscribe(listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
      }
      
      notifyListeners(action, route) {
        this.listeners.forEach(listener => {
          listener({ action, route, stack: [...this.navigationStack] });
        });
      }
      
      getCurrentRoute() {
        return this.currentRoute;
      }
      
      getNavigationStack() {
        return [...this.navigationStack];
      }
    }
    
    // React Hook
    function useCustomNavigation() {
      const [navigationState, setNavigationState] = useState({
        currentRoute: null,
        stack: []
      });
      
      useEffect(() => {
        const unsubscribe = navigationManager.subscribe((state) => {
          setNavigationState({
            currentRoute: state.route,
            stack: state.stack
          });
        });
        
        return unsubscribe;
      }, []);
      
      return {
        navigate: navigationManager.navigate.bind(navigationManager),
        goBack: navigationManager.goBack.bind(navigationManager),
        reset: navigationManager.reset.bind(navigationManager),
        currentRoute: navigationState.currentRoute,
        stack: navigationState.stack
      };
    }
    ```

26. **How would you implement a custom React Native state management system with persistence?**
    ```javascript
    class PersistentStateManager {
      constructor(storageKey = 'app_state') {
        this.storageKey = storageKey;
        this.state = {};
        this.listeners = new Set();
        this.middlewares = [];
        this.isInitialized = false;
      }
      
      async initialize() {
        try {
          const savedState = await AsyncStorage.getItem(this.storageKey);
          if (savedState) {
            this.state = JSON.parse(savedState);
          }
          this.isInitialized = true;
          this.notifyListeners('initialized', this.state);
        } catch (error) {
          console.error('Failed to initialize state:', error);
          this.isInitialized = true;
        }
      }
      
      async setState(newState) {
        const prevState = this.state;
        this.state = { ...this.state, ...newState };
        
        // Apply middlewares
        for (const middleware of this.middlewares) {
          await middleware(prevState, this.state);
        }
        
        // Persist to storage
        try {
          await AsyncStorage.setItem(this.storageKey, JSON.stringify(this.state));
        } catch (error) {
          console.error('Failed to persist state:', error);
        }
        
        this.notifyListeners('stateChanged', this.state);
      }
      
      getState() {
        return this.state;
      }
      
      subscribe(listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
      }
      
      useMiddleware(middleware) {
        this.middlewares.push(middleware);
      }
      
      notifyListeners(action, state) {
        this.listeners.forEach(listener => {
          listener({ action, state });
        });
      }
      
      async clearState() {
        this.state = {};
        await AsyncStorage.removeItem(this.storageKey);
        this.notifyListeners('stateCleared', this.state);
      }
    }
    
    // React Hook
    function usePersistentState(stateManager) {
      const [state, setState] = useState(stateManager.getState());
      const [isInitialized, setIsInitialized] = useState(stateManager.isInitialized);
      
      useEffect(() => {
        if (!stateManager.isInitialized) {
          stateManager.initialize().then(() => {
            setIsInitialized(true);
            setState(stateManager.getState());
          });
        }
        
        const unsubscribe = stateManager.subscribe(({ action, state: newState }) => {
          if (action === 'initialized' || action === 'stateChanged') {
            setState(newState);
          }
        });
        
        return unsubscribe;
      }, [stateManager]);
      
      return {
        state,
        setState: stateManager.setState.bind(stateManager),
        isInitialized
      };
    }
    ```

27. **How would you implement a custom React Native performance monitoring system?**
    ```javascript
    class ReactNativePerformanceMonitor {
      constructor() {
        this.metrics = new Map();
        this.observers = new Set();
        this.isMonitoring = false;
        this.frameDrops = 0;
        this.lastFrameTime = 0;
      }
      
      startMonitoring() {
        this.isMonitoring = true;
        this.startFrameMonitoring();
        this.startMemoryMonitoring();
        this.startNetworkMonitoring();
      }
      
      stopMonitoring() {
        this.isMonitoring = false;
        this.stopFrameMonitoring();
        this.stopMemoryMonitoring();
        this.stopNetworkMonitoring();
      }
      
      startFrameMonitoring() {
        const monitorFrames = () => {
          if (!this.isMonitoring) return;
          
          requestAnimationFrame(() => {
            const currentTime = Date.now();
            const frameTime = currentTime - this.lastFrameTime;
            
            if (this.lastFrameTime > 0) {
              if (frameTime > 16.67) { // 60fps threshold
                this.frameDrops++;
              }
              
              this.recordMetric('frameTime', frameTime);
            }
            
            this.lastFrameTime = currentTime;
            monitorFrames();
          });
        };
        
        monitorFrames();
      }
      
      startMemoryMonitoring() {
        this.memoryInterval = setInterval(() => {
          if (!this.isMonitoring) return;
          
          // Get memory usage (platform-specific)
          if (Platform.OS === 'ios') {
            this.getIOSMemoryUsage();
          } else {
            this.getAndroidMemoryUsage();
          }
        }, 1000);
      }
      
      startNetworkMonitoring() {
        // Monitor network requests
        const originalFetch = global.fetch;
        global.fetch = async (...args) => {
          const startTime = Date.now();
          try {
            const response = await originalFetch(...args);
            const endTime = Date.now();
            this.recordMetric('networkRequest', endTime - startTime);
            return response;
          } catch (error) {
            const endTime = Date.now();
            this.recordMetric('networkError', endTime - startTime);
            throw error;
          }
        };
      }
      
      recordMetric(name, value) {
        if (!this.metrics.has(name)) {
          this.metrics.set(name, []);
        }
        
        const metrics = this.metrics.get(name);
        metrics.push({ value, timestamp: Date.now() });
        
        // Keep only last 100 measurements
        if (metrics.length > 100) {
          metrics.shift();
        }
        
        this.notifyObservers(name, value);
      }
      
      getMetrics() {
        const result = {};
        for (const [name, values] of this.metrics.entries()) {
          result[name] = {
            current: values[values.length - 1]?.value,
            average: values.reduce((sum, item) => sum + item.value, 0) / values.length,
            min: Math.min(...values.map(item => item.value)),
            max: Math.max(...values.map(item => item.value)),
            count: values.length
          };
        }
        return result;
      }
      
      subscribe(observer) {
        this.observers.add(observer);
        return () => this.observers.delete(observer);
      }
      
      notifyObservers(metricName, value) {
        this.observers.forEach(observer => {
          observer(metricName, value);
        });
      }
    }
    
    // React Hook
    function usePerformanceMonitor() {
      const [metrics, setMetrics] = useState({});
      
      useEffect(() => {
        const monitor = new ReactNativePerformanceMonitor();
        monitor.startMonitoring();
        
        const unsubscribe = monitor.subscribe((metricName, value) => {
          setMetrics(prev => ({
            ...prev,
            [metricName]: value
          }));
        });
        
        return () => {
          unsubscribe();
          monitor.stopMonitoring();
        };
      }, []);
      
      return metrics;
    }
    ```

28. **How would you implement a custom React Native animation system?**
    ```javascript
    class CustomAnimationSystem {
      constructor() {
        this.animations = new Map();
        this.isRunning = false;
        this.animationId = null;
      }
      
      createAnimation(key, config) {
        const animation = {
          key,
          config,
          currentValue: config.from || 0,
          startTime: null,
          isRunning: false
        };
        
        this.animations.set(key, animation);
        return animation;
      }
      
      startAnimation(key) {
        const animation = this.animations.get(key);
        if (!animation) return;
        
        animation.isRunning = true;
        animation.startTime = Date.now();
        
        if (!this.isRunning) {
          this.startAnimationLoop();
        }
      }
      
      stopAnimation(key) {
        const animation = this.animations.get(key);
        if (animation) {
          animation.isRunning = false;
        }
        
        if (this.animations.size === 0) {
          this.stopAnimationLoop();
        }
      }
      
      startAnimationLoop() {
        this.isRunning = true;
        
        const animate = (timestamp) => {
          if (!this.isRunning) return;
          
          let hasRunningAnimations = false;
          
          for (const [key, animation] of this.animations.entries()) {
            if (!animation.isRunning) continue;
            
            hasRunningAnimations = true;
            const elapsed = timestamp - animation.startTime;
            const progress = Math.min(elapsed / animation.config.duration, 1);
            
            // Easing function
            const easedProgress = this.applyEasing(progress, animation.config.easing);
            
            // Calculate current value
            const from = animation.config.from || 0;
            const to = animation.config.to || 1;
            animation.currentValue = from + (to - from) * easedProgress;
            
            // Call onUpdate callback
            if (animation.config.onUpdate) {
              animation.config.onUpdate(animation.currentValue);
            }
            
            // Check if animation is complete
            if (progress >= 1) {
              animation.isRunning = false;
              if (animation.config.onComplete) {
                animation.config.onComplete();
              }
            }
          }
          
          if (hasRunningAnimations) {
            this.animationId = requestAnimationFrame(animate);
          } else {
            this.stopAnimationLoop();
          }
        };
        
        this.animationId = requestAnimationFrame(animate);
      }
      
      stopAnimationLoop() {
        this.isRunning = false;
        if (this.animationId) {
          cancelAnimationFrame(this.animationId);
          this.animationId = null;
        }
      }
      
      applyEasing(progress, easing = 'linear') {
        switch (easing) {
          case 'ease-in':
            return progress * progress;
          case 'ease-out':
            return 1 - Math.pow(1 - progress, 2);
          case 'ease-in-out':
            return progress < 0.5 
              ? 2 * progress * progress 
              : 1 - Math.pow(-2 * progress + 2, 2) / 2;
          case 'bounce':
            return this.bounceEasing(progress);
          default:
            return progress;
        }
      }
      
      bounceEasing(progress) {
        if (progress < 1 / 2.75) {
          return 7.5625 * progress * progress;
        } else if (progress < 2 / 2.75) {
          return 7.5625 * (progress -= 1.5 / 2.75) * progress + 0.75;
        } else if (progress < 2.5 / 2.75) {
          return 7.5625 * (progress -= 2.25 / 2.75) * progress + 0.9375;
        } else {
          return 7.5625 * (progress -= 2.625 / 2.75) * progress + 0.984375;
        }
      }
    }
    
    // React Hook
    function useCustomAnimation(config) {
      const [value, setValue] = useState(config.from || 0);
      const animationSystem = useRef(new CustomAnimationSystem());
      
      const startAnimation = useCallback(() => {
        const animation = animationSystem.current.createAnimation('default', {
          ...config,
          onUpdate: setValue
        });
        animationSystem.current.startAnimation('default');
      }, [config]);
      
      const stopAnimation = useCallback(() => {
        animationSystem.current.stopAnimation('default');
      }, []);
      
      useEffect(() => {
        return () => {
          animationSystem.current.stopAnimation('default');
        };
      }, []);
      
      return { value, startAnimation, stopAnimation };
    }
    ```

## Common Interview Scenarios

29. **How would you architect a large-scale React Native application?**
    - Implement feature-based folder structure
    - Use dependency injection for services
    - Implement proper state management with Redux/Zustand
    - Use TypeScript for type safety
    - Implement proper error boundaries and logging
    - Use code splitting and lazy loading
    - Implement proper testing strategy

30. **How would you handle app updates and versioning?**
    - Implement semantic versioning
    - Use CodePush for non-breaking updates
    - Implement proper migration strategies
    - Use feature flags for gradual rollouts
    - Implement proper rollback mechanisms
    - Monitor app performance and crashes

31. **How would you optimize a React Native app for different screen sizes?**
    - Use responsive design principles
    - Implement proper layout calculations
    - Use Dimensions API for screen size detection
    - Implement proper image scaling
    - Use flexbox for responsive layouts
    - Test on various device sizes

32. **How would you implement security in a React Native app?**
    - Implement proper certificate pinning
    - Use secure storage for sensitive data
    - Implement proper authentication flows
    - Use biometric authentication
    - Implement proper data encryption
    - Use secure communication protocols
