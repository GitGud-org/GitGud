<h1 align="center">
	<br>
	<img width="1000" alt="GitGud" src="media/GitGud.jpg">
	<br>
	<br>
</h1>

# GitGud

 ## **Introduction**

 GitGud allows you to easily visualize and fully utilize git throughout your projects. It is created using [Ink](https://github.com/vadimdemedes/ink) which provides the same component-based UI building experience that React offers, but in a Command Line Interface (CLI).


 ## **Requirements**
 - Have at least **git version 2.24.3** installed
 - Have [npm](https://www.npmjs.com/get-npm) installed

---

## **Installation**
```
$ npm install --global gitgud
```

---

This will install the package globally
## **Usage**
```
$ GitGud
```
- Navigate to any project that has a git directory in it and run the 'gitgud' command. This will load the gitgud UI to your terminal window

- The GitGud UI consists of: Unstaged Changes, Staged Changes, Git Branch tree view and functionality buttons
- Navigate through the UI with either the 'tab' button or left/right arrow keys
- Press 'enter/return' button to select/click an option
- Throughout the app you can hit the 'esc'(escape) button to go back

---
## **Functionality**
* ### **Stage Changes**
  - You can select `STAGE/UNSTAGE (all files)` to move all the files between Stage Changes and Unstage Changes.
  - If you click it once it will move all files from 'Unstaged Changes' section of UI to 'Stage Changes'. If you click it again it will undo the 'Staged Changes' and move files back to 'Unstaged Changes' and so on.
  - You also have the option to stage/unstage individual files by navigating through them with the up/down keys.
  - Press 'ESC' to exit out of stage changes menu.
* ### **Commit Changes**
  - It will promt you to enter a 'Commit Message' which **does not require** you to wrap input in quotation marks. After entering and submitting the commit message, it run the commit and bring you back to the main menu.
  - Press 'ESC' to exit out of commit changes.
* ### **Push Staged Changes**
  - This will push staged changes to the current branch you are on.
  - You can see what branch you are on on the top of the GUI.
* ### **Checkout Branch**
  - It will display list of all the branches in the project. The branches are not selectible, they are there to help you see which local branches are available to switch to.
  - You are prompted to enter a branch to Checkout. If you enter a branch that does not exist, it will create a new one.
  - If you have unstaged changes, an error will be shown and it will abort the checkout operation, telling you that you have unstaged changes and to commit or stash the changes before switching branches. You can press 'ESC' to go back and stash/commit the changes before you attempt to checkout again
* ### **Delete Branch**
  - It will display list of branches which are not selectable, they are there to help you see which local branches are available.
  - You are promted to enter a branch name, and if the branch exists it will delete/remove it and bring you back to main menu. If the branch does not exist then it will throw an error.
  - Press 'ESC' to exit out of delete branch
* ### **Access Full Log Tree**
   - It will render the entire log tree overlaying the gitgud GUI.
   - Press 'ESC' to exit out of log tree
### **FAQ**
### **Contributing**
GitGud is a fully open source project and contributions are welcome!

When submitting a pull request, please clearly explain the feature you added or the bug you fixed.


Thanks to [`Joseph Garrone`](https://github.com/JosephGarrone) for giving us the NPM package name.
