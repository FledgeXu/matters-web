(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{1795:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var taggedTemplateLiteral=__webpack_require__(2),taggedTemplateLiteral_default=__webpack_require__.n(taggedTemplateLiteral),style=__webpack_require__(1),style_default=__webpack_require__.n(style),react=__webpack_require__(0),react_default=__webpack_require__.n(react),react_hooks_esm=__webpack_require__(48),src=__webpack_require__(3),src_default=__webpack_require__.n(src),useResponsive=__webpack_require__(393),Spinner=__webpack_require__(510),GQL_error=__webpack_require__(808),Dialog=__webpack_require__(214),Translate=__webpack_require__(83),InfiniteList=__webpack_require__(1917),UserDigest=__webpack_require__(66),analytics=__webpack_require__(1779),connections=__webpack_require__(1806),_defaultExport=[".container.jsx-3495621170{display:inline-block;padding-top:0.5rem;padding-left:1rem;line-height:inherit;text-align:left;}",".avatar-list.jsx-3495621170 .avatar{position:relative;border:2px solid #fff;}",".avatar-list.jsx-3495621170 .avatar+.avatar{margin-left:-0.5rem;}",".avatar-list.jsx-3495621170 .avatar:nth-child(1){z-index:5;}",".avatar-list.jsx-3495621170 .avatar:nth-child(2){z-index:4;}",".avatar-list.jsx-3495621170 .avatar:nth-child(3){z-index:3;}",".avatar-list.jsx-3495621170 .avatar:nth-child(4){z-index:2;}",".avatar-list.jsx-3495621170 .avatar:nth-child(5){z-index:1;}",".name-list.jsx-3495621170{margin-top:0.25rem;font-size:0.875rem;}",".name-list.jsx-3495621170 .highlight.jsx-3495621170{color:#0d6763;}",".dialog-appreciators-list.jsx-3495621170{padding:0.75rem 0;}",".dialog-appreciators-list.jsx-3495621170 .appreciation-amount.jsx-3495621170{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;box-sizing:content-box;min-width:1rem;height:1rem;margin-top:-2px;margin-right:-2px;font-size:0.75rem;font-weight:700;color:#fff;text-align:center;background:#0d6763;border:2px solid #fff;border-radius:1rem;}"];_defaultExport.__hash="3495621170";var styles=_defaultExport,__jsx=react_default.a.createElement;function _templateObject(){var data=taggedTemplateLiteral_default()(["\n  query ArticleAppreciators($mediaHash: String, $after: String) {\n    article(input: { mediaHash: $mediaHash }) {\n      id\n      appreciationsReceived(input: { first: 10, after: $after }) {\n        totalCount\n        pageInfo {\n          startCursor\n          endCursor\n          hasNextPage\n        }\n        edges {\n          cursor\n          node {\n            ... on Appreciation {\n              amount\n              sender {\n                ...UserDigestRichUserPublic\n                ...UserDigestRichUserPrivate\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n  ","\n  ","\n"]);return _templateObject=function _templateObject(){return data},data}var ARTICLE_APPRECIATORS=src_default()(_templateObject(),UserDigest.a.Rich.fragments.user.public,UserDigest.a.Rich.fragments.user.private);__webpack_exports__.default=function AppreciatorsDialogContent(_ref){var _data$article,_data$article2,mediaHash=_ref.mediaHash,closeDialog=_ref.closeDialog,isSmallUp=Object(useResponsive.a)("sm-up"),_useQuery=Object(react_hooks_esm.d)(ARTICLE_APPRECIATORS,{variables:{mediaHash:mediaHash}}),data=_useQuery.data,loading=_useQuery.loading,error=_useQuery.error,fetchMore=_useQuery.fetchMore,article=null==data?void 0:data.article,_ref2=(null==data||null===(_data$article=data.article)||void 0===_data$article?void 0:_data$article.appreciationsReceived)||{},edges=_ref2.edges,pageInfo=_ref2.pageInfo;if(loading)return __jsx(Spinner.a,null);if(error)return __jsx(GQL_error.a,{error:error});if(!edges||edges.length<=0||!pageInfo||!article)return null;var totalCount=(null==data||null===(_data$article2=data.article)||void 0===_data$article2?void 0:_data$article2.appreciationsReceived.totalCount)||0,defaultListMaxHeight=function calcContentMaxHeight(){if(window){return.01*window.innerHeight*90-16*(1.5+(isSmallUp?2.5:1.5)+1.5+1)}}();return __jsx(react_default.a.Fragment,null,__jsx(Dialog.a.Header,{title:__jsx(Translate.a,{zh_hant:"".concat(totalCount," 人讚賞了作品"),zh_hans:"".concat(totalCount," 人赞赏了作品")}),closeDialog:closeDialog,closeTextId:"close"}),__jsx(Dialog.a.Content,null,__jsx("div",{className:"jsx-".concat(styles.__hash)+" dialog-appreciators-list"},__jsx(InfiniteList.a,{data:edges,defaultListMaxHeight:defaultListMaxHeight,defaultRowHeight:70,loader:__jsx(Spinner.a,null),loadMore:function loadMore(callback){return analytics.a.trackEvent("load_more",{type:"appreciators",location:edges.length}),fetchMore({variables:{after:pageInfo.endCursor},updateQuery:function updateQuery(previousResult,_ref4){var fetchMoreResult=_ref4.fetchMoreResult;return callback(),Object(connections.a)({oldData:previousResult,newData:fetchMoreResult,path:"article.appreciationsReceived"})}})},renderer:function ListRow(_ref3){var index=_ref3.index,datum=_ref3.datum,node=datum.node,cursor=datum.cursor;return __jsx("div",{key:cursor,className:"jsx-".concat(styles.__hash)+" appreciator-item"},node.sender&&__jsx(UserDigest.a.Rich,{user:node.sender,avatarBadge:__jsx("span",{className:"jsx-".concat(styles.__hash)+" appreciation-amount"},node.amount),onClick:function onClick(){analytics.a.trackEvent("click_feed",{type:"appreciators",contentType:"user",styleType:"card",location:index})}}),__jsx(style_default.a,{id:styles.__hash},styles))},totalCount:totalCount})),__jsx(style_default.a,{id:styles.__hash},styles)))};try{Content.displayName="Content",Content.__docgenInfo={description:"",displayName:"Content",props:{mediaHash:{defaultValue:null,description:"",name:"mediaHash",required:!0,type:{name:"string"}},closeDialog:{defaultValue:null,description:"",name:"closeDialog",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Dialogs/AppreciatorsDialog/Content.tsx#Content"]={docgenInfo:Content.__docgenInfo,name:"Content",path:"src/components/Dialogs/AppreciatorsDialog/Content.tsx#Content"})}catch(__react_docgen_typescript_loader_error){}},1917:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return InfiniteList}));var _home_runner_work_matters_web_matters_web_node_modules_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(78),_home_runner_work_matters_web_matters_web_node_modules_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_home_runner_work_matters_web_matters_web_node_modules_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__),react_virtualized__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(1865),__jsx=react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement,InfiniteList=function InfiniteList(_ref){var _window,data=_ref.data,loader=_ref.loader,loadMore=_ref.loadMore,renderer=_ref.renderer,totalCount=_ref.totalCount,_ref$defaultListHeigh=_ref.defaultListHeight,defaultListHeight=void 0===_ref$defaultListHeigh?10:_ref$defaultListHeigh,defaultListMaxHeight=_ref.defaultListMaxHeight,defaultRowHeight=_ref.defaultRowHeight,_ref$threshold=_ref.threshold,threshold=void 0===_ref$threshold?1:_ref$threshold,cache=new react_virtualized__WEBPACK_IMPORTED_MODULE_2__.c({fixedWidth:!0,defaultHeight:defaultListHeight}),_useState=Object(react__WEBPACK_IMPORTED_MODULE_1__.useState)(defaultRowHeight?defaultRowHeight*data.length:defaultListHeight),listHeight=_useState[0],setListHeight=_useState[1],maxHeight=Object(react__WEBPACK_IMPORTED_MODULE_1__.useState)(defaultListMaxHeight||(null===(_window=window)||void 0===_window?void 0:_window.innerHeight)||defaultListHeight)[0],rowRenderer=function rowRenderer(_ref4){var index=_ref4.index,key=_ref4.key,parent=_ref4.parent,style=_ref4.style,datum=data[index],props={cache:cache,columnIndex:0,key:key,parent:parent,rowIndex:index};return __jsx(react_virtualized__WEBPACK_IMPORTED_MODULE_2__.b,props,__jsx("div",{style:style},datum?renderer({index:index,datum:datum}):loader))},onRowsHaveRendered=function onRowsHaveRendered(){if(listHeight<maxHeight){var current=function calculate(){return _home_runner_work_matters_web_matters_web_node_modules_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(Array(data.length).keys()).reduce((function(sum,index){return sum+cache.getHeight(index,0)}),0)}();listHeight<current&&setListHeight(Math.min(maxHeight,current))}},count=(null==data?void 0:data.length)||0,rowCount=(totalCount||0)>count?count+1:count,listStyle={height:"".concat(Math.min(maxHeight,listHeight),"px")};return __jsx("div",{className:"infinite-list",style:listStyle},__jsx(react_virtualized__WEBPACK_IMPORTED_MODULE_2__.d,{isRowLoaded:function isRowLoaded(_ref2){var index=_ref2.index;return!!data[index]},loadMoreRows:function loadMoreRows(_ref3){var startIndex=_ref3.startIndex;return loadMore((function(){return cache.clear(startIndex,0)}))},rowCount:totalCount,threshold:threshold},(function(_ref5){var _onRowsRendered=_ref5.onRowsRendered,registerChild=_ref5.registerChild;return __jsx(react_virtualized__WEBPACK_IMPORTED_MODULE_2__.a,null,(function(_ref6){var width=_ref6.width,height=_ref6.height;return __jsx(react_virtualized__WEBPACK_IMPORTED_MODULE_2__.e,{width:width,height:height,deferredMeasurementCache:cache,ref:registerChild,rowHeight:cache.rowHeight,rowRenderer:rowRenderer,rowCount:rowCount,onRowsRendered:function onRowsRendered(params){_onRowsRendered(params),onRowsHaveRendered()},overscanRowCount:0})}))})))};try{InfiniteList.displayName="InfiniteList",InfiniteList.__docgenInfo={description:"",displayName:"InfiniteList",props:{data:{defaultValue:null,description:"",name:"data",required:!0,type:{name:"T[]"}},loader:{defaultValue:null,description:"",name:"loader",required:!0,type:{name:"ReactNode"}},loadMore:{defaultValue:null,description:"",name:"loadMore",required:!0,type:{name:"(callback: () => void) => Promise<any>"}},renderer:{defaultValue:null,description:"",name:"renderer",required:!0,type:{name:"(props: RowRendererProps<T>) => ReactNode"}},totalCount:{defaultValue:null,description:"",name:"totalCount",required:!0,type:{name:"number"}},defaultListHeight:{defaultValue:{value:"10"},description:"",name:"defaultListHeight",required:!1,type:{name:"number"}},defaultListMaxHeight:{defaultValue:null,description:"",name:"defaultListMaxHeight",required:!1,type:{name:"number"}},defaultRowHeight:{defaultValue:null,description:"",name:"defaultRowHeight",required:!1,type:{name:"number"}},threshold:{defaultValue:{value:"1"},description:"",name:"threshold",required:!1,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Interaction/InfiniteList/index.tsx#InfiniteList"]={docgenInfo:InfiniteList.__docgenInfo,name:"InfiniteList",path:"src/components/Interaction/InfiniteList/index.tsx#InfiniteList"})}catch(__react_docgen_typescript_loader_error){}}}]);