# React.js Interview Questions - 7 Years Experience Level (Senior Full-Stack Developer)

## Core React Fundamentals

1. **What is React.js and how is it different from other libraries/frameworks?**
   React is a JavaScript library for building user interfaces, particularly web applications. It's component-based, uses a virtual DOM for performance, and follows a unidirectional data flow. Unlike frameworks like Angular, React is just the view layer and requires additional libraries for routing, state management, etc.

2. **What is JSX? What is the difference between JSX and TSX?**
   JSX is a syntax extension that allows you to write HTML-like code in JavaScript. TSX is JSX with TypeScript, providing type safety and better development experience.

3. **Explain the concept of Virtual DOM in React**
   Virtual DOM is a JavaScript representation of the real DOM. React creates a virtual copy of the DOM in memory, makes changes to it, and then efficiently updates only the parts of the real DOM that have changed.

4. **How is Virtual DOM different from Real DOM?**
   - Virtual DOM: Lightweight JavaScript object, faster updates, batched changes
   - Real DOM: Heavy browser API, slower updates, immediate changes

5. **What are the different types of components in React?**
   - Functional Components: JavaScript functions that return JSX
   - Class Components: ES6 classes that extend React.Component

## Components and Props

6. **Difference between class and functional components**
   - Functional: Simpler syntax, use hooks, better performance
   - Class: Use lifecycle methods, this keyword, more verbose

7. **What is state in React?**
   State is a JavaScript object that stores component data that can change over time. When state changes, the component re-renders.

8. **What are props and the difference between props and state?**
   Props are read-only data passed from parent to child components. State is internal component data that can be modified.

9. **What is props drilling and alternatives to it?**
   Props drilling occurs when data is passed through multiple component levels. Alternatives include Context API, Redux, or state management libraries.

10. **Difference between controlled and uncontrolled components**
    - Controlled: Form data is handled by React state
    - Uncontrolled: Form data is handled by the DOM itself

## Hooks

11. **What are React hooks? List out hooks you have used**
    Hooks are functions that let you use state and other React features in functional components. Common hooks: useState, useEffect, useContext, useReducer, useMemo, useCallback, useRef.

12. **What is useState and how does it work?**
    ```javascript
    const [count, setCount] = useState(0);
    ```
    useState returns an array with the current state value and a function to update it.

13. **What is useEffect and common pitfalls?**
    useEffect handles side effects in functional components. Common pitfalls: missing dependency array, infinite loops, not cleaning up effects.

14. **What is the dependency array in useEffect?**
    The dependency array tells React when to re-run the effect. Empty array `[]` runs once, no array runs on every render.

15. **Difference between useEffect and useLayoutEffect**
    - useEffect: Runs after DOM updates (asynchronous)
    - useLayoutEffect: Runs synchronously after DOM mutations but before browser paint

16. **What is useRef and common use cases?**
    useRef returns a mutable ref object. Common uses: accessing DOM elements, storing mutable values, persisting values across renders.

17. **Difference between useRef and useState**
    - useRef: Doesn't trigger re-renders, mutable
    - useState: Triggers re-renders, immutable updates

18. **What is useMemo and when to use it?**
    useMemo memoizes expensive calculations. Use when you have expensive computations that depend on specific values.

19. **What is useCallback and when to use it?**
    useCallback memoizes functions. Use when passing functions to child components to prevent unnecessary re-renders.

20. **What are the rules of hooks?**
    - Only call hooks at the top level
    - Only call hooks from React functions
    - Don't call hooks inside loops, conditions, or nested functions

21. **What are custom hooks? Provide an example**
    Custom hooks are functions that use other hooks. Example:
    ```javascript
    function useCounter(initialValue = 0) {
        const [count, setCount] = useState(initialValue);
        const increment = () => setCount(count + 1);
        const decrement = () => setCount(count - 1);
        return { count, increment, decrement };
    }
    ```

## Context API and State Management

22. **What is Context API and when to use it?**
    Context API provides a way to share data across the component tree without prop drilling. Use for global state like themes, user authentication.

23. **Difference between Context API and Redux**
    - Context API: Built-in, simpler, good for small to medium apps
    - Redux: External library, more features, better for large apps

24. **What is Redux Toolkit? How does it simplify Redux?**
    Redux Toolkit provides utilities to simplify Redux usage with less boilerplate, built-in best practices, and better developer experience.

25. **What are middleware in Redux?**
    Middleware provides a way to extend Redux with custom functionality. Common middleware: Redux Thunk, Redux Saga, Redux Logger.

## Lifecycle and Side Effects

26. **Explain lifecycle methods of components**
    - Mounting: componentDidMount
    - Updating: componentDidUpdate
    - Unmounting: componentWillUnmount

27. **How do functional components handle lifecycle methods?**
    Functional components use useEffect hook to handle lifecycle events:
    ```javascript
    useEffect(() => {
        // componentDidMount
        return () => {
            // componentWillUnmount
        };
    }, []);
    ```

## Performance Optimization

28. **What is React.memo and how does it work?**
    React.memo is a higher-order component that memoizes the result of a component, preventing unnecessary re-renders when props haven't changed.

29. **What is the React reconciliation process?**
    Reconciliation is the process by which React updates the DOM. It compares the new virtual DOM with the previous one and updates only the differences.

30. **How to avoid unnecessary re-rendering in React?**
    - Use React.memo for components
    - Use useMemo and useCallback for expensive operations
    - Optimize state structure
    - Use proper keys in lists

31. **What is the concept of virtualization in React?**
    Virtualization renders only visible items in large lists, improving performance by reducing DOM nodes.

32. **How do you optimize rendering of large lists in React?**
    - Use virtualization libraries (react-window, react-virtualized)
    - Implement pagination
    - Use React.memo for list items
    - Optimize data structure

## Forms and Events

33. **How do you manage form validation in React?**
    ```javascript
    const [errors, setErrors] = useState({});
    const validateForm = (data) => {
        const newErrors = {};
        if (!data.email) newErrors.email = 'Email is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    ```

34. **How to pass arguments to event handlers in React?**
    ```javascript
    <button onClick={() => handleClick(id)}>Click</button>
    <button onClick={handleClick.bind(null, id)}>Click</button>
    ```

35. **What is a synthetic event in React?**
    Synthetic events are React's cross-browser wrapper around native events, providing consistent behavior across different browsers.

## Routing

36. **How do you handle dynamic routing in React?**
    Using React Router with route parameters:
    ```javascript
    <Route path="/users/:id" component={UserDetail} />
    // Access with useParams()
    const { id } = useParams();
    ```

37. **How would you implement lazy loading with routes?**
    ```javascript
    const LazyComponent = React.lazy(() => import('./LazyComponent'));
    
    <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
    </Suspense>
    ```

## Error Handling

38. **What is the purpose of error boundaries in React?**
    Error boundaries catch JavaScript errors anywhere in the component tree and display fallback UI instead of crashing the app.

39. **How do you handle errors in asynchronous operations in React?**
    ```javascript
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api.getData();
                setData(data);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchData();
    }, []);
    ```

## Data Fetching

40. **How do you fetch data in React?**
    ```javascript
    useEffect(() => {
        fetch('/api/data')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => setError(error));
    }, []);
    ```

41. **What is Axios and how is it different from fetch API?**
    - Axios: Third-party library, automatic JSON parsing, request/response interceptors
    - Fetch: Native browser API, manual JSON parsing, promise-based

42. **How would you implement retries logic for failed API requests?**
    ```javascript
    const fetchWithRetry = async (url, retries = 3) => {
        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch(url);
                return response.json();
            } catch (error) {
                if (i === retries - 1) throw error;
                await new Promise(resolve => setTimeout(resolve, 1000 * i));
            }
        }
    };
    ```

## Advanced Concepts

43. **What are fragments in React? Why are they used?**
    Fragments allow grouping multiple elements without adding extra DOM nodes:
    ```javascript
    <>
        <h1>Title</h1>
        <p>Content</p>
    </>
    ```

44. **What is the significance of React.StrictMode?**
    StrictMode helps identify potential problems by enabling additional checks and warnings for its descendants.

45. **What are keys in React? Why are they important in lists?**
    Keys help React identify which items have changed, been added, or removed. They should be unique and stable.

46. **What is a Higher Order Component (HOC)?**
    HOC is a function that takes a component and returns a new component with additional functionality.

47. **What is React Server Components (RSC)?**
    RSC allows components to render on the server, reducing client-side JavaScript and improving performance.

## Testing

48. **How do you test React components?**
    - Unit testing: Jest + React Testing Library
    - Integration testing: Testing component interactions
    - Snapshot testing: Capturing component output

## Performance and Production

49. **How do you optimize a React application for performance?**
    - Code splitting and lazy loading
    - Memoization (React.memo, useMemo, useCallback)
    - Virtualization for large lists
    - Bundle optimization
    - Image optimization

50. **How do you build React applications for production?**
    ```bash
    npm run build
    ```
    This creates optimized, minified production build in the `build` folder.

## Security

51. **How do you securely store API keys in React?**
    - Use environment variables (REACT_APP_ prefix)
    - Never commit API keys to version control
    - Use server-side proxy for sensitive keys
    - Implement proper CORS policies

## Environment and Configuration

52. **Explain the purpose of .env file in React?**
    .env files store environment variables. Variables must be prefixed with `REACT_APP_` to be accessible in the browser.

## Memory Management

53. **How do you identify and fix memory leaks in React?**
    - Use React DevTools Profiler
    - Clean up event listeners and subscriptions
    - Cancel ongoing requests in useEffect cleanup
    - Avoid creating objects in render methods

## Build Tools

54. **What is the major difference between Webpack and Babel?**
    - Webpack: Module bundler that combines files
    - Babel: JavaScript compiler that transforms modern JavaScript to compatible versions

## Styling

55. **What is a styled component?**
    Styled components allow writing CSS-in-JS with component-level styling and dynamic styling based on props.

## Concurrent Features

56. **What are React Concurrent Features?**
    Concurrent features include useTransition, useDeferredValue, and Suspense for data fetching, allowing React to work on multiple tasks simultaneously.

## Accessibility

57. **How do you implement accessibility in React?**
    - Use semantic HTML elements
    - Add ARIA attributes
    - Implement keyboard navigation
    - Ensure proper focus management
    - Use screen reader friendly content

## Advanced React Architecture (7+ Years Experience)

58. **How would you implement a custom React state management library?**
    ```javascript
    class CustomStateManager {
        constructor(initialState = {}) {
            this.state = initialState;
            this.listeners = new Set();
            this.middlewares = [];
        }
        
        subscribe(listener) {
            this.listeners.add(listener);
            return () => this.listeners.delete(listener);
        }
        
        setState(newState) {
            const prevState = this.state;
            this.state = { ...this.state, ...newState };
            
            this.middlewares.forEach(middleware => {
                middleware(prevState, this.state);
            });
            
            this.listeners.forEach(listener => listener(this.state));
        }
        
        useMiddleware(middleware) {
            this.middlewares.push(middleware);
        }
        
        getState() {
            return this.state;
        }
    }
    
    // React Hook
    function useStateManager(stateManager) {
        const [state, setState] = React.useState(stateManager.getState());
        
        React.useEffect(() => {
            const unsubscribe = stateManager.subscribe(setState);
            return unsubscribe;
        }, [stateManager]);
        
        return [state, stateManager.setState.bind(stateManager)];
    }
    ```

59. **How would you implement a custom React renderer for a different target?**
    ```javascript
    class CustomRenderer {
        constructor(target) {
            this.target = target;
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
                const domElement = document.createElement(type);
                
                Object.keys(otherProps).forEach(key => {
                    if (key === 'className') {
                        domElement.className = otherProps[key];
                    } else if (key.startsWith('on')) {
                        const eventType = key.toLowerCase().substring(2);
                        domElement.addEventListener(eventType, otherProps[key]);
                    } else {
                        domElement.setAttribute(key, otherProps[key]);
                    }
                });
                
                if (children) {
                    if (Array.isArray(children)) {
                        children.forEach(child => this.renderElement(child, domElement));
                    } else {
                        this.renderElement(children, domElement);
                    }
                }
                
                container.appendChild(domElement);
            }
        }
    }
    ```

60. **How would you implement a custom React concurrent feature?**
    ```javascript
    class ConcurrentScheduler {
        constructor() {
            this.taskQueue = [];
            this.isProcessing = false;
            this.currentPriority = 'normal';
        }
        
        scheduleTask(task, priority = 'normal') {
            this.taskQueue.push({ task, priority, id: Date.now() });
            this.taskQueue.sort((a, b) => {
                const priorityOrder = { high: 3, normal: 2, low: 1 };
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            });
            
            if (!this.isProcessing) {
                this.processTasks();
            }
        }
        
        async processTasks() {
            this.isProcessing = true;
            
            while (this.taskQueue.length > 0) {
                const { task } = this.taskQueue.shift();
                
                try {
                    await task();
                } catch (error) {
                    console.error('Task failed:', error);
                }
                
                // Yield control to allow other tasks to run
                await new Promise(resolve => setTimeout(resolve, 0));
            }
            
            this.isProcessing = false;
        }
        
        useConcurrentTask(task, priority = 'normal') {
            const [isRunning, setIsRunning] = React.useState(false);
            const [result, setResult] = React.useState(null);
            const [error, setError] = React.useState(null);
            
            const runTask = React.useCallback(async () => {
                setIsRunning(true);
                setError(null);
                
                try {
                    const taskResult = await new Promise((resolve, reject) => {
                        this.scheduleTask(async () => {
                            try {
                                const result = await task();
                                resolve(result);
                            } catch (err) {
                                reject(err);
                            }
                        }, priority);
                    });
                    
                    setResult(taskResult);
                } catch (err) {
                    setError(err);
                } finally {
                    setIsRunning(false);
                }
            }, [task, priority]);
            
            return { runTask, isRunning, result, error };
        }
    }
    ```

61. **How would you implement a custom React error boundary with advanced features?**
    ```javascript
    class AdvancedErrorBoundary extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                hasError: false,
                error: null,
                errorInfo: null,
                retryCount: 0
            };
        }
        
        static getDerivedStateFromError(error) {
            return { hasError: true };
        }
        
        componentDidCatch(error, errorInfo) {
            this.setState({
                error,
                errorInfo,
                retryCount: this.state.retryCount + 1
            });
            
            // Log to external service
            this.logErrorToService(error, errorInfo);
            
            // Report to monitoring service
            if (this.props.onError) {
                this.props.onError(error, errorInfo);
            }
        }
        
        logErrorToService(error, errorInfo) {
            // Implementation for logging to external service
            console.error('Error logged:', { error, errorInfo });
        }
        
        handleRetry = () => {
            this.setState({
                hasError: false,
                error: null,
                errorInfo: null
            });
        }
        
        handleReset = () => {
            this.setState({
                hasError: false,
                error: null,
                errorInfo: null,
                retryCount: 0
            });
        }
        
        render() {
            if (this.state.hasError) {
                if (this.props.fallback) {
                    return this.props.fallback(this.state.error, this.handleRetry);
                }
                
                return (
                    <div className="error-boundary">
                        <h2>Something went wrong</h2>
                        <details>
                            <summary>Error Details</summary>
                            <pre>{this.state.error && this.state.error.toString()}</pre>
                            <pre>{this.state.errorInfo.componentStack}</pre>
                        </details>
                        <button onClick={this.handleRetry}>Retry</button>
                        <button onClick={this.handleReset}>Reset</button>
                        <p>Retry count: {this.state.retryCount}</p>
                    </div>
                );
            }
            
            return this.props.children;
        }
    }
    ```

62. **How would you implement a custom React performance monitoring system?**
    ```javascript
    class PerformanceMonitor {
        constructor() {
            this.metrics = new Map();
            this.observers = new Set();
        }
        
        startMeasure(name) {
            performance.mark(`${name}-start`);
        }
        
        endMeasure(name) {
            performance.mark(`${name}-end`);
            performance.measure(name, `${name}-start`, `${name}-end`);
            
            const measure = performance.getEntriesByName(name)[0];
            this.metrics.set(name, measure.duration);
            
            this.notifyObservers(name, measure.duration);
        }
        
        measureComponent(Component) {
            return class extends React.Component {
                componentDidMount() {
                    this.monitor.startMeasure(`${Component.name}-mount`);
                }
                
                componentDidUpdate() {
                    this.monitor.startMeasure(`${Component.name}-update`);
                }
                
                render() {
                    return <Component {...this.props} />;
                }
            };
        }
        
        subscribe(observer) {
            this.observers.add(observer);
            return () => this.observers.delete(observer);
        }
        
        notifyObservers(metricName, duration) {
            this.observers.forEach(observer => {
                observer(metricName, duration);
            });
        }
        
        getMetrics() {
            return Object.fromEntries(this.metrics);
        }
    }
    
    // Usage
    const monitor = new PerformanceMonitor();
    
    function usePerformanceMonitor(componentName) {
        React.useEffect(() => {
            monitor.startMeasure(`${componentName}-render`);
            
            return () => {
                monitor.endMeasure(`${componentName}-render`);
            };
        });
    }
    ```