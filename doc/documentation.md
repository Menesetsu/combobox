#Index

**Classes**

* [class: Combobox](#Combobox)
  * [new Combobox(input, optionsData, customDropDownConfig, customSelectBoxConfig)](#new_Combobox)
  * [Combobox.enable(input)](#Combobox.enable)
  * [Combobox.enable(input)](#Combobox.enable)
  * [const: Combobox.E_CREATED](#Combobox.E_CREATED)

**Namespaces**

* [Combobox](#Combobox)
  * [Combobox.enable(input)](#Combobox.enable)
  * [Combobox.enable(input)](#Combobox.enable)
  * [const: Combobox.E_CREATED](#Combobox.E_CREATED)

**Events**

* [event: "combobox:created"](#combobox_created)

**Functions**

* [getBlock()](#getBlock)
* [getEventTarget()](#getEventTarget)
 
<a name="Combobox"></a>
#class: Combobox
**Members**

* [class: Combobox](#Combobox)
  * [new Combobox(input, optionsData, customDropDownConfig, customSelectBoxConfig)](#new_Combobox)
  * [Combobox.enable(input)](#Combobox.enable)
  * [Combobox.enable(input)](#Combobox.enable)
  * [const: Combobox.E_CREATED](#Combobox.E_CREATED)

<a name="new_Combobox"></a>
##new Combobox(input, optionsData, customDropDownConfig, customSelectBoxConfig)
Creates new combobox

**Params**

- input `HTMLInputElement`  
- optionsData `Object` - data as an Object, not to be taken from select element  
- customDropDownConfig `Object`  
- customSelectBoxConfig `Object`  

<a name="Combobox.enable"></a>
##Combobox.enable(input)
Disable combobox

**Params**

- input `Node` - containing select block  

<a name="Combobox.enable"></a>
##Combobox.enable(input)
Enable combobox

**Params**

- input `Node` - containing select block  

<a name="Combobox.E_CREATED"></a>
##const: Combobox.E_CREATED
**Type**: `string`  
**Default**: `combobox:created`  
<a name="Combobox"></a>
#Combobox
**Copyright**: Devexperts  
**Members**

* [Combobox](#Combobox)
  * [Combobox.enable(input)](#Combobox.enable)
  * [Combobox.enable(input)](#Combobox.enable)
  * [const: Combobox.E_CREATED](#Combobox.E_CREATED)

<a name="Combobox.enable"></a>
##Combobox.enable(input)
Disable combobox

**Params**

- input `Node` - containing select block  

<a name="Combobox.enable"></a>
##Combobox.enable(input)
Enable combobox

**Params**

- input `Node` - containing select block  

<a name="Combobox.E_CREATED"></a>
##const: Combobox.E_CREATED
**Type**: `string`  
**Default**: `combobox:created`  
<a name="combobox_created"></a>
#event: "combobox:created"
Triggers when combobox is created

<a name="getBlock"></a>
#getBlock()
Get HTMLNode containing combobox

**Returns**: `Node`  
<a name="getEventTarget"></a>
#getEventTarget()
Get element which listens to events

**Returns**: `Node`  
