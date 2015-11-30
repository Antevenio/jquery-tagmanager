# jquery-tagmanager
Google Tagmanager jQuery plugin

## Usage

The first call must include Google TagManager ID:
```javascript
$.tagManager({id: 'GTM-ABC123'});
```

Then you can push events manually:

```javascript
$.tagManager('push', {
  category: 'Conversion', 
  action: 'Recharge', 
  label: 'Recharge_Btn', 
  event: 'eventga'
});
```
You can also push events throw with HTM5's data attributes. The Element needs to contain "ga-tag" class:
```html
<button type="button" class="ga-tag" 
  data-gacategory="Conversion" data-gaaction="Recharge" 
  data-galabel="Recharge_Btn" data-gaevent="eventga">
</button>
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

You can change them in every call:
```javascript
$.tagManager({debug: false, class: "my-ga-tag"});
```



