<h1 align="center">
	<br>
	<img width="1000" alt="GitGud" src="media/GitGud.jpg">
	<br>
	<br>
</h1>

# GitGud

 ## **Introduction**
 GitGud allows you to easily visualize and fully utilize git throughout your projects. It is created using [Ink](https://github.com/vadimdemedes/ink) which provides same component-based UI building experience that React offers, but in CLI (Command Line Interface). 
     
     
 ## **Requirements**
 - Have at least **git version 2.24.3** installed
 - Have [npm](https://www.npmjs.com/get-npm) installed


## **Installation**
```
$ npm install --global gitgud
```
This will install the package globally
## **Usage**
```
$ GitGud
```
- Navigate to any project that has a git directory in it and run the 'gitgud' command. This will load the gitgud UI to your terminal window
- GitGud UI consists view of: Unstaged Changes, Staged Changes, Git Branch tree view and functionality buttons 
- Navigate through the UI with either the 'tab' button or left/right arrow keys
- Press 'enter/return' button to select/click an option
- Throughout the app you can hit 'esc'(escape) button to go back
## **Functionality**
* ### **Stage Changes**
-- You can select 'STAGE/UNSTAGE (all files)' to move all the files between Stage Changes and Unstage Changes.
-- If you once which will move all files from 'Unstaged Changes' section of UI to 'Stage Changes'. If you click it again it will undo the 'Staged Changes' and move files back to 'Unstaged Changes' and so on.
-- You also have an option to stage/unstage individual files at your desire.
-- Press 'ESC' to exit out of stage changes
* ### **Commit Changes**
-- It will promt you to enter a 'Commit Message' which **does not require** you to wrap input in quotation marks. After entering and submitting the commit message it will bring you back to main menu and add the latest commit with its message to 'Git Branch' tree on the top of it
-- Press 'ESC' to exit out of commit changes
* ### **Push Staged Changes**
-- This will push staged changes to the branch you are on
* ### **Checkout Branch**
-- It will display list of branches which are not selectable, they are there to help you see which local branches are available.
-- It will promt you to enter 'Checkout branch' and if it does not exist on local it will create a new one and if it exists then it will checkout to the existing one.
-- If you have unstaged changes the error will be shown and will abort operation and tell you that you have unstaged changes and to commit the changes or stash before switching branches. You can press 'ESC' to go back and stash/commit the changes before you attempt to checkout again
* ### **Delete Branch**
-- It will display list of branches which are not selectable, they are there to help you see which local branches are available.
-- It will promt you to enter 'Delete Branch' and if the branch exists it will delete/remove it and bring you back to main menu, if the branch does not exist then it will throw an error.
-- Press 'ESC' to exit out of delete branch
* ### **Access Full Log Tree**
-- It will render whole full log tree which is scrollable which shows the tree and commit messages where the * is on the tree
-- Press 'ESC' to exit out of log tree
### **FAQ**
### **Contributing**
-- GitGud is a fully open source project and contributions are welcome!
-- When submitting a pull request, please clearly explain the feature you added or the bug you fixed.


Thanks to [`Joseph Garrone`](#https://github.com/JosephGarrone) for giving us the NPM package name.
