export {
    addIngredient,
    removeIngredient,
    initIngredient,
} from './burgerBuilder';

export {
    order,
    purchaseInit,
    fetchOrder,
} from './order';

export {
    auth,
} from './auth'

// TODO Reducer quản lý các global state, thay đổi các state => giống useState
// ! Action quản lý các hành động
// * actionType: Ghi lại các hành động, dynamic code
// ? index.js trong action để export hết các actions 
// TODO viết actionType -> action (burgerBuilder trong actions) -> handle nó trong reducer -> sang container để mapStateToProps -> execute
// ! import reducer trong index.js (file cao nhất)
// * import actions trong container

// TODO thunk để xử lý bất đồng bộ của redux, redux-thunk
// TODO add redux-thunk phải add cả redux devtool
//? const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//? const store = createStore(burgerBuilderReducer, composeEnhancers(applyMiddleware(thunk)));
//? index.js <Provider store = {store}> <App /> <Provider />

//* connect(mapStateToProps, mapStateToDispatch)()
//* mapStateToProps -> chuyển các state chung thành state dùng cho container đó
//* mapStateToDispatch -> return 1 object: key là tên function tự đặt, value là callback, hàm trong callback được định nghĩa ở action
//* action định nghĩa các action, rồi dùng reducer để thay đổi giá trị các global state

// TODO import reducer trong index.js -> createStore / combineStore
// TODO import actions trong container