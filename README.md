# jquery-tagmanager
Google Tagmanager jQuery plugin

## Usage

```javascript
$.tagManager({id: 'GTM-ABC123'});
```

The first call must include the GTM ID.

It will push events from every element with predefined data attributes. i.e.:
```html
<button type="button" class="ga-tag" 
  data-gacategory="Conversion" data-gaaction="Recharge" 
  data-galabel="Recharge_Btn" data-gaevent="eventga">
</button>
```
The Element needs to contain "ga-tag" class. 

You can also push events manually:
```javascript
$.tagManager('push', {
  category: 'Conversion', 
  action: 'Recharge', 
  label: 'Recharge_Btn', 
  event: 'eventga'
});
```

## Settings:

Default settings are:
```javascript
var defaultSettings = { 
  where: "document",
  class: "ga-tag",
  event: "click",
  debug: false
};
```

You can change them in every call. i.e.:
```javascript
$.tagManager({debug: false, class: "my-ga-tag"});
```
