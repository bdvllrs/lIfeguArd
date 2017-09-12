# GLUI

React boilerplate with CSS template using Grids.

## Style components
Most of the style can be edited using the scss variables in the `src/scss/variables/` folder.

### Grid Container
```html
<div class="container grid-container">
    ...
</div>
```
### Navbar

```html
<div class="navbar">
    <ul class="menu">
        <li><a href="#">Menu</a></li>
        <li><a href="#" class="active">Menu</a></li>
    </ul>
</div>
```

### Content

`<main class="content"></div>`

### Message
Message notification. Use the Message React component.
```html
<div class="message">
    <p>Content</p>
</div>
```
The classes `success`, `error`, `warning` and `default` can also be used.
### Form
```html
<form>
    <div class="form-group">
        <label>Some label</label>
        <input />
    </div>
</form>
```

Also `<form class="vertical"></form>`.
### Table
```html
<table>
    ...
</table>
```
For stripped rows, use the `stripped` class name.
### Panel
```html
<div class="panel">
    <div class="panel-heading">
        Heading
    </div>
    <div class="panel-body">
        Content
    </div>
</div>
```
The classes `success`, `error`, `default` and `warning` are available.

### Card
```html
<div class="cards">
    <div class="card">
        <div class="card-heading"></div>
        <div class="card-content"></div>
        <ul class="card-list"></ul>
    </div>
    <div class="card large">
        <div class="card-heading"></div>
        <div class="card-content"></div>
        <ul class="card-list"></ul>
    </div>
</div>

```
### Dropdown
```html
<div class="dropdown">
    <div class="dropdown-container">
        <a href="#">Click here</a>
        <ul class="dropdown-menu">
            <li><a href="#">Some link</a></li>
            <li><a href="#">Some link</a></li>
        </ul>
    </div>
</div>
```

### Buttons
```html
<button class="btn"></button>
```
Also `success`, `error`, `warning`, `default` and `dark`.

### Tooltip
```html
<div class="tooltip">
    text
    <div class="tooltip-body">
        Content
    </div>
</div> 
```

## React Components

### Dropdown
```html
<Dropdown label="Some label">
    <li><a href="http://example.com">Example</a></li>
    <li><a href="#">Some other example</a></li>
</Dropdown>
```
The `label` prop will be set as the placeholder text.
#### Props
 - `label` placeholder text.
 - `className` class name for the placeholder.
 
### Tooltip
```html
<Tooltip message="some message">
    some text
</Tooltip>
```
The tooltip appears on the bottom.
#### Props
 - `message` the message that will appear
 - `top` to make the tooltip appear on top

### Switchers
#### SwitcherClass
```html
<a id="hamButton" role="button"><span className="oi" data-glyph="menu" aria-hidden/></a>
<SwitcherClass trigger="hamButton" className="active">
    <nav class="sidebar">
        Somme content
    </nav>
</SwitcherClass>
```
##### Props
 - `trigger` id of the trigger element
 - `className` class to switch
#### Switcher
##### Props
 - `trigger`

### Message
```html
<Message timer="5">
    Message content
</Message>
```

#### Props
 - `error`, `success`, `warning`, `default`
 - `timer` value in sec before the message is hidden
 
### Forms
```html
<Form>
    // Content
</Form>
```
#### Props
 - `action`
 - `method`
 - `submit`
 - `onChange`(id, value, success, message)
 - `onSubmit`(values)
 
#### Input
```html
<Input id="idOfInput" />
```
##### Props
- `id` name of the input
- `type` type
- `label`
- `help` text that appear underneath the input
- `required`
- `rule` regexp
- `ruleMessage` text that appears if the `rule` is not matched
- `success`, `error`, `warning`, `default`

#### Select
```html
<Select id="numbers">
    <option value="1">1</option>
    <option value="2">2</option>
</Select>
```
##### Props
- `id`
- `label`
- `value` value of the selected option
- `success`, `error`, `warning`, `default`

#### List
```html
<List id="gender">
    <ListItem value="male" label="Male"/>
    <ListItem value="female" label="Female"/>
</List>
```
##### Props
- `id`
- `label`
- `value`
- `searchable` add a search input
- `multiple` multiple choices
- `success`, `error`, `warning`, `default`