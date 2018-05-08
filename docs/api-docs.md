running without jsdoc.json
[37;40mnpm[0m [0m[32minfo[0m [0m[35mit worked if it ends with[0m ok
[0m[37;40mnpm[0m [0m[32minfo[0m [0m[35musing[0m npm@5.3.0
[0m[37;40mnpm[0m [0m[32minfo[0m [0m[35musing[0m node@v8.5.0
[0m[37;40mnpm[0m [0m[32minfo[0m [0m[35mok[0m 
[0m## Classes

<dl>
<dt><a href="#env-val">env-val</a></dt>
<dd></dd>
<dt><a href="#EnvVal">EnvVal</a></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#init">init</a></dt>
<dd><p>Initializes the configuration objects.</p>
</dd>
<dt><a href="#setConfigs
Set custom configs, based on the schemes already loaded.">setConfigs
Set custom configs, based on the schemes already loaded.</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#EnvValOptions">EnvValOptions</a> : <code>object</code></dt>
<dd></dd>
</dl>

<a name="env-val"></a>

## env-val
**Kind**: global class  
<a name="new_env-val_new"></a>

### new env-val()
env-val allows you to easily load, validate and overwrite environment variables used in your node.js project.

<a name="EnvVal"></a>

## EnvVal
**Kind**: global class  
<a name="new_EnvVal_new"></a>

### new EnvVal(envValOpts)
Create a new EnvVal instance.


| Param | Type | Description |
| --- | --- | --- |
| envValOpts | [<code>EnvValOptions</code>](#EnvValOptions) | Options for for env-val. |

<a name="init"></a>

## init
Initializes the configuration objects.

**Kind**: global variable  
**Access**: public  
<a name="setConfigs
Set custom configs, based on the schemes already loaded."></a>

## setConfigs
Set custom configs, based on the schemes already loaded.
**Kind**: global variable  
**Access**: public  
<a name="EnvValOptions"></a>

## EnvValOptions : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| CONFIG_DIR | <code>string</code> | The directory to load the configuration files from. |

