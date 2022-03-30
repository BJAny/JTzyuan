"use strict";(self.webpackChunkcoblocks=self.webpackChunkcoblocks||[]).push([[260],{9260:function(e,t,l){l.r(t),l.d(t,{default:function(){return $}});var o=l(7462),n=l(9307),a=l(4184),s=l.n(a),c=l(5736),i=[{
/* translators: visual style option */
label:(0,c.__)("Dark","coblocks"),value:"dark"},{
/* translators: visual style option */
label:(0,c.__)("Light","coblocks"),value:"light"},{
/* translators: visual style option */
label:(0,c.__)("None","coblocks"),value:"none"}],r=l(5697),u=l.n(r),b=[{label:(0,c.__)("None","coblocks"),value:"none"},{label:(0,c.__)("Media file","coblocks"),value:"media"},{label:(0,c.__)("Attachment page","coblocks"),value:"attachment"},{label:(0,c.__)("Custom URL","coblocks"),value:"custom"}],m=l(5609);class p extends n.Component{constructor(){super(...arguments),this.setNewTab=this.setNewTab.bind(this),this.setLinkRel=this.setLinkRel.bind(this),this.setLinkTo=this.setLinkTo.bind(this)}componentDidUpdate(e){const{attributes:t,setAttributes:l}=this.props,{lightbox:o}=t;"none"!==e.attributes.linkTo&&o&&l({linkTo:"none"})}setLinkTo(e){const{setAttributes:t}=this.props;t({linkTo:e})}setLinkRel(e){const{setAttributes:t}=this.props;t({rel:e})}setNewTab(e){const{attributes:t,setAttributes:l}=this.props,{rel:o}=t,n=e?"_blank":void 0;let a=o;n&&!o?a="noreferrer noopener":n||"noreferrer noopener"!==o||(a=void 0),l({rel:a,target:n})}render(){const{attributes:e,setAttributes:t}=this.props,{lightbox:l,linkTo:o,target:a,rel:s}=e;return(0,n.createElement)(n.Fragment,null,!l&&(0,n.createElement)(m.PanelBody,{initialOpen:!1,title:(0,c.__)("Link settings","coblocks")},(0,n.createElement)(m.SelectControl,{label:(0,c.__)("Link to","coblocks"),onChange:this.setLinkTo,options:b,value:o}),"none"!==o&&(0,n.createElement)(n.Fragment,null,(0,n.createElement)(m.ToggleControl,{checked:"_blank"===a,label:(0,c.__)("Open in new tab","coblocks"),onChange:this.setNewTab}),(0,n.createElement)(m.TextControl
/* translators: html attribute that specifies the relationship between two pages */,{label:(0,c.__)("Link rel","coblocks"),onChange:e=>t({rel:e}),value:s}))))}}p.propTypes={attributes:u().object,setAttributes:u().func};var _=p,k=l(7635),d=l(2819),g=l.n(d);const h=[{
/* translators: abbreviation for small size */
label:(0,c.__)("S","coblocks"),tooltip:(0,c.__)("Small","coblocks"),value:1},{
/* translators: abbreviation for medium size */
label:(0,c.__)("M","coblocks"),tooltip:(0,c.__)("Medium","coblocks"),value:2},{
/* translators: abbreviation for large size */
label:(0,c.__)("L","coblocks"),tooltip:(0,c.__)("Large","coblocks"),value:3},{
/* translators: abbreviation for extra large size */
label:(0,c.__)("XL","coblocks"),tooltip:(0,c.__)("Extra Large","coblocks"),value:4}],v={label:(0,c.__)("None","coblocks"),tooltip:(0,c.__)("None","coblocks"),value:0},E={label:(0,n.createElement)(m.Icon,{icon:k.ewm}),tooltip:(0,c.__)("Custom","coblocks"),value:"custom"};class C extends n.Component{render(){const{advancedMaxValue:e,advancedMinValue:t,currentOption:l,label:o,onChange:a,options:c,showAdvancedControls:i,showIcons:r,showNoneOption:u,showCustomOption:b}=this.props;let p=c||h;return u&&(p=[v,...p]),b&&(p=[...p,E]),i&&!1!==t&&!1!==e?(0,n.createElement)(m.RangeControl,{label:o,max:e,min:t,onChange:e=>a(e),value:l}):(0,n.createElement)(m.BaseControl,{className:s()("coblocks-option-selector-control",{"is-custom":"custom"===l}),id:`coblocks-option-selector-${(0,d.kebabCase)(o)}`,label:o},(0,n.createElement)(m.PanelRow,null,(0,n.createElement)(m.ButtonGroup,{"aria-label":o},p.map((e=>(0,n.createElement)(m.Tooltip,{key:`option-${e.value}`,text:e.tooltip},(0,n.createElement)(m.Button,{"aria-label":e.tooltip,"aria-pressed":l===e.value,isPrimary:l===e.value,isSecondary:l!==e.value,onClick:()=>a(e.value)},r?e.icon:e.label)))))))}}C.propTypes={advancedMaxValue:u().number,advancedMinValue:u().number,currentOption:u().oneOfType([u().string,u().number]),label:u().string,onChange:u().func,options:u().array,showAdvancedControls:u().bool,showCustomOption:u().bool,showIcons:u().bool,showNoneOption:u().bool};const w=[{
/* translators: abbreviation for small size */
label:(0,c.__)("S","coblocks"),tooltip:(0,c.__)("Small","coblocks"),value:"small"},{
/* translators: abbreviation for medium size */
label:(0,c.__)("M","coblocks"),tooltip:(0,c.__)("Medium","coblocks"),value:"medium"},{
/* translators: abbreviation for large size */
label:(0,c.__)("L","coblocks"),tooltip:(0,c.__)("Large","coblocks"),value:"large"}],f=e=>{const{attributes:t,setAttributes:l}=e,{align:o,gutter:a,gutterCustom:s}=t,i="full"===o?10:5;return(0,n.useEffect)((()=>{s>i&&l({gutterCustom:i})}),[s,i]),(0,n.createElement)(n.Fragment,null,(0,n.createElement)(C,{currentOption:a,label:(0,c.__)("Gutter","coblocks"),onChange:e=>l({gutter:e}),options:w,showCustomOption:!0}),"custom"===a&&(0,n.createElement)(m.RangeControl,{initialValue:0,max:i,min:0,onChange:e=>l({gutterCustom:e.toString()}),step:.1,value:parseFloat(s)||0,withInputField:!0}))};var y=f;f.propTypes={attributes:u().object,setAttributes:u().func};var N=l(2175),S=e=>{const{attributes:t,setAttributes:l,enableGutter:o,enableCaptions:a}=e,{shadow:s,captions:r,captionStyle:u,lightbox:b}=t,p=[{value:"sm",
/* translators: abbreviation for small size */
label:(0,c.__)("S","coblocks"),tooltip:(0,c.__)("Small","coblocks")},{value:"md",
/* translators: abbreviation for medium size */
label:(0,c.__)("M","coblocks"),tooltip:(0,c.__)("Medium","coblocks")},{value:"lg",
/* translators: abbreviation for large size */
label:(0,c.__)("L","coblocks"),tooltip:(0,c.__)("Large","coblocks")}];return(0,n.createElement)(N.InspectorControls,null,(0,n.createElement)(m.PanelBody,{title:(0,c.__)("Collage settings","coblocks")},o&&(0,n.createElement)(y,e),!o&&(0,n.createElement)(C,{label:(0,c.__)("Shadow","coblocks"),options:p,currentOption:s,showNoneOption:!0,onChange:t=>{return l=t,void e.setAttributes({shadow:l});var l}}),(0,n.createElement)(m.ToggleControl,{label:(0,c.__)("Lightbox","coblocks"),checked:!!b,onChange:()=>l({lightbox:!b}),help:e=>e?(0,c.__)("Image lightbox is enabled.","coblocks"):(0,c.__)("Toggle to enable the image lightbox.","coblocks")}),a&&(0,n.createElement)(m.ToggleControl,{label:(0,c.__)("Captions","coblocks"),checked:!!r,onChange:()=>l({captions:!r}),help:e=>e?(0,c.__)("Showing captions for each media item.","coblocks"):(0,c.__)("Toggle to show media captions.","coblocks")}),r&&(0,n.createElement)(m.SelectControl,{label:(0,c.__)("Caption style","coblocks"),value:u,onChange:t=>{e.setAttributes({captionStyle:t})},options:i})),(0,n.createElement)(_,e))},T=l(9818);const L=e=>{let{hoveredFilter:t}=e;if(!t)return null;const l=g().cloneDeep((0,T.select)("core/block-editor").getSelectedBlock());return l.attributes.filter=t,(0,n.createElement)("div",{className:"block-editor-block-switcher__popover__preview__parent"},(0,n.createElement)("div",{className:"block-editor-block-switcher__popover__preview__container"},(0,n.createElement)(m.Popover,{className:"block-editor-block-switcher__preview__popover coblocks-image-filter-popover",focusOnMount:!1,position:"bottom right"},(0,n.createElement)("div",{className:"block-editor-block-switcher__preview coblocks__preview"},(0,n.createElement)("div",{className:"block-editor-block-switcher__preview-title"},(0,c.__)("Preview filter","coblocks")),(0,n.createElement)(N.BlockPreview,{autoHeight:!0,blocks:{...l}})))))},A=e=>{const[t,l]=(0,n.useState)(null),o=e=>{l(e)},{attributes:a,setAttributes:i}=e,{filter:r}=a,u=[{icon:(0,n.createElement)(m.Icon,{icon:k.mJk}),isActive:"none"===r,onClick:()=>{i({filter:"none"})},slug:"none",
/* translators: image style */
title:(0,c.__)("Original","coblocks")},{icon:(0,n.createElement)(m.Icon,{icon:k.NC1}),isActive:"grayscale"===r,onClick:()=>{i({filter:"grayscale"})},slug:"grayscale",
/* translators: image style */
title:(0,c.__)("Grayscale filter","coblocks")},{icon:(0,n.createElement)(m.Icon,{icon:k.amg}),isActive:"sepia"===r,onClick:()=>{i({filter:"sepia"})},slug:"sepia",
/* translators: image style */
title:(0,c.__)("Sepia filter","coblocks")},{icon:(0,n.createElement)(m.Icon,{icon:k.swD}),isActive:"saturation"===r,onClick:()=>{i({filter:"saturation"})},slug:"saturation",
/* translators: image style */
title:(0,c.__)("Saturation filter","coblocks")},{icon:(0,n.createElement)(m.Icon,{icon:k.tu4}),isActive:"dim"===r,onClick:()=>{i({filter:"dim"})},slug:"dim",
/* translators: image style */
title:(0,c.__)("Dim filter","coblocks")},{icon:(0,n.createElement)(m.Icon,{icon:k.jZD}),isActive:"vintage"===r,onClick:()=>{i({filter:"vintage"})},slug:"vintage",
/* translators: image style */
title:(0,c.__)("Vintage filter","coblocks")}];return(0,n.createElement)(m.ToolbarGroup,null,(0,n.createElement)(m.DropdownMenu,{className:s()("components-coblocks-media-filter","none"!==r?"has-filter":""),icon:(0,n.createElement)(m.Icon,{icon:k.AF8}),label:(0,c.__)("Apply filter","coblocks"),noIcons:!0,popoverProps:{className:"components-coblocks-dropdown"}},(()=>(0,n.createElement)(m.MenuGroup,null,(0,n.createElement)(L,{hoveredFilter:t}),u.map((e=>(0,n.createElement)(m.MenuItem,{icon:e.icon,isSelected:r===e.slug,key:`coblocks-image-filter-${e.slug}`,label:e.title,onClick:e.onClick,onMouseEnter:()=>o(e.slug),onMouseLeave:()=>o(null),role:"menuitemradio"},e.title)))))))};var x=A;A.propTypes={attributes:u().object,setAttributes:u().func};var I=e=>{const{attributes:t}=e,{images:l}=t,o=!!l.filter((e=>void 0!==e.id)).length;return(0,n.createElement)(N.BlockControls,null,o&&(0,n.createElement)(x,e))},M=l(2547),O=l(3264),B=l(2238);const D=e=>{const{noticeOperations:t,onSelect:l,label:o}=e;return(0,n.createElement)(m.DropZone,{label:o,onFilesDrop:e=>{(0,B.mediaUpload)({allowedTypes:M.o2,filesList:e,onError:t.createErrorNotice,onFileChange:e=>l(e)})}})};D.propTypes={label:u().string,noticeOperations:u().object,onSelect:u().func};var F=D,R=l(4333),P=l(1313),G=l(444),U=(0,n.createElement)(G.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,n.createElement)(G.Path,{d:"M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"})),$=(0,R.compose)([m.withNotices])((e=>{const[t,l]=(0,n.useState)(null),[a,i]=(0,n.useState)(null),[r,u]=(0,n.useState)(!1),b=(0,R.usePrevious)(e.className),p=(0,R.usePrevious)(e.isSelected);(0,n.useEffect)((()=>{e.className!==b&&(e.className.includes("is-style-layered")?(i(e.attributes.gutter),e.setAttributes({gutter:"small"})):(i(null),e.setAttributes({shadow:"none",gutter:a||C.gutter})))}),[e.className,b]),(0,n.useEffect)((()=>{e.isSelected!==p&&!1===e.isSelected&&l(null)}),[e.isSelected,p]);const _=t=>{const{attributes:l}=e;return l.images.find((e=>parseInt(e.index)===parseInt(t)))},k=t=>{const{noticeOperations:l}=e;l.removeAllNotices(),l.createErrorNotice(t)},d=(t,l)=>{const{attributes:o,setAttributes:n}=e;n({images:[...o.images.filter((e=>parseInt(e.index)!==parseInt(l))),{...M.oj(t),index:l}]})},g=(t,l)=>{const{attributes:o,setAttributes:n}=e,a=_(t);n({images:[...o.images.filter((e=>parseInt(e.index)!==parseInt(t))),Object.assign({},a,l)]})},h=()=>{u(!0)},v=o=>{const a=_(o),i=e.isSelected&&t===a.index,u=!e.className.includes("is-style-layered"),b=(0,n.createElement)(m.DropZone,{onFilesDrop:e=>((e,t)=>{(0,B.mediaUpload)({allowedTypes:["image"],filesList:e,onFileChange:e=>{let[l]=e;return d(l,t)},onError:k})})(e,o),label:(0,c.__)("Drop image to replace","coblocks")});return(0,n.createElement)(n.Fragment,null,(0,n.createElement)("a",{role:"button",tabIndex:"0",onClick:()=>(e=>{t!==e&&l(e)})(a.index)},(0,n.createElement)("figure",{className:s()({"wp-block-coblocks-gallery-collage__figure":!0,"is-transient":(0,P.isBlobURL)(a.url),"is-selected":i,[`shadow-${e.attributes.shadow}`]:e.attributes.shadow})},i&&(0,n.createElement)(n.Fragment,null,(0,n.createElement)(m.ButtonGroup,{className:"block-library-gallery-item__inline-menu is-right is-visible"},(0,n.createElement)(N.MediaUploadCheck,null,(0,n.createElement)(N.MediaUpload,{allowedTypes:["image"],onSelect:e=>d(e,o),value:a.url,render:e=>{let{open:t}=e;return(0,n.createElement)(m.Button,{className:"coblocks-gallery-item__button-replace",onClick:t,label:(0,c.__)("Replace Image","coblocks")},(0,c.__)("Replace","coblocks"))}})),(0,n.createElement)(m.Button,{icon:U,onClick:()=>(t=>{const{attributes:l,setAttributes:o}=e;o({images:[...l.images.filter((e=>parseInt(e.index)!==parseInt(t)))]})})(o),label:(0,c.__)("Remove image","coblocks"),disabled:!i}))),t===a.index&&"custom"===e.attributes.linkTo&&(0,n.createElement)("form",{className:"components-coblocks-gallery-item__image-link",onSubmit:e=>e.preventDefault()},(0,n.createElement)(m.Dashicon,{icon:"admin-links"}),(0,n.createElement)(N.URLInput,{value:a.imgLink,onChange:e=>g(o,{imgLink:e})}),(0,n.createElement)(m.Button,{icon:r?"saved":"editor-break",label:r?(0,c.__)("Saving","coblocks"):(0,c.__)("Apply","coblocks"),onClick:h,type:"submit"})),b,(0,P.isBlobURL)(a.url)&&(0,n.createElement)(m.Spinner,null),(0,n.createElement)("img",{src:a.url,alt:a.alt}),u&&e.attributes.captions&&(a.caption||i)&&(0,n.createElement)(N.RichText,{tagName:"figcaption",placeholder:(0,c.__)("Write caption…","coblocks"),className:"coblocks-gallery--caption",value:a.caption,onChange:e=>g(o,{caption:e}),isSelected:i,inlineToolbar:!0}))))},E=t=>{const l=!!_(t),a=s()("wp-block-coblocks-gallery-collage__figure",{[`shadow-${e.attributes.shadow}`]:e.attributes.shadow});return(0,n.createElement)(N.MediaPlaceholder,{addToGallery:!0,className:a,allowedTypes:["image"],disableDropZone:!0,disableMediaButtons:l,accept:"image/*",multiple:!1,icon:!1,labels:{title:" ",instructions:" "},onSelect:e=>d(e,t),onError:k},(0,n.createElement)(F,(0,o.Z)({},e,{label:"Drop file to upload",onSelect:e=>{let[l]=e;return d(l,t)}})))},{attributes:C,className:w,noticeUI:f}=e,{animation:y,captions:T,captionStyle:L,filter:A,lightbox:x}=C,D=!w.includes("is-style-layered"),G=!w.includes("is-style-layered"),$=[];for(let l=0;l<(["is-style-tiled","is-style-layered"].includes(e.attributes.className)?4:5);l++){const e=_(l);$.push((0,n.createElement)("li",{key:`image-${l}`,className:s()("wp-block-coblocks-gallery-collage__item",`item-${l+1}`,{[`coblocks-animate ${y}`]:y,"is-selected":l===parseInt(t)})},e?v(l):E(l)))}return(0,n.createElement)(n.Fragment,null,(0,n.createElement)(I,e),(0,n.createElement)(S,(0,o.Z)({},e,{enableGutter:D,enableCaptions:G})),f,(0,n.createElement)(O.Z,C,(0,n.createElement)("div",{className:s()(w,{[`has-filter-${A}`]:"none"!==A,[`has-caption-style-${L}`]:T&&void 0!==L,"has-lightbox":x})},(0,n.createElement)("ul",null,$))))}))}}]);