# **Feature Request**: PopUp window after saving Playlist
December 2nd 2022

## OBJECTIVE
* Add the ability for better understanding of saving a playlist process by showing a message.

## BACKGROUND
Currently, "Jammming" supports the ability to create one new playlist at a time and save it to Spotify. However, user did not get any notification for successful or unsuccessful saving process. 
This feature accomplishes the following:
* Displays a pop-up window for successful saving processes.

## TECHNICAL DESIGN

### Rendering
A new component, "Popup" should be created. this component on render will show a window on screen with a message to notify user that 
playlist saved successfully.
We will need an initial state for this component for keep hiding it from DOM, after receiving "Resolves" from our "Promises" we should update the state to show Success message to the users.
We should use a condition for rendering Popup component, for this we will use a boolean default state at the App component and will pass it down to Popup component as a prop.
* e.g:  ... Popup ... Component {
    .....
    return if(this.props.popup) 
    ....
}

### Showing the Popup window
We will use "setState()" in App component, savePlaylist() method for refresh our states to default when a playlist has been saved, same-time we'll update popup's state to "true" to render that on screen.

### Closing the Popup window
For closing the Popup we are not allowed to update props's value at child component so we should define a new method, "closePopup()" in App(parent) component and update our popup state in that with using setState, then we should pass it as a prop to Popup component, then we can use it for Popup's event listener button.

## CAVEATS
## UPDATES
