# MermerSoftPaint
#### Video Demo:  https://youtu.be/Y0FsKhbVylI?si=Gn5r77TJZCUFVWm2
#### Description:
#### MermerSoftPaint is a bitmap painting webapp made using JavaScript. I decided to make it because me and my friends like to create art using deprecated painting softwares. I thought it would be fun imitate our beloved drawing tools myself. This project was made with the intention of teaching myself javascript, CLI git, and to fullfill the final project requirements of the cs50x Harvard OpenCourseWare. In the future, I would like to turn MermerSoftPaint into a usable, lightweight painting software.
## Design Choices:
### developed using git
#### To be able to work as a team, or to get hired in the future, I need to know git. To help me learn, I thought it would be helpful to develop the program using github for code management. This is because it is the predominant version manager for most developers. Having good git skills will allow me to work in teams or contribute to projects in the future. Through this project, I have learned the basics of the git workflow (project directory, staging area, and repository), basic commands (git add, commit, push, pull, ect.), and how to split my repo into branches based on my needs. In this project specifically, I maintained two branches; a development and main branch. This is because I, as the sole developer, don't need to worry as much about conflicts. This is subject to change in the future.
### written in vanilla Javascript
#### In the future, I would like to use MermerSoftPaint to create drawing games in the style of Broken Picturephone. Because of this, it was important that the application could run in a browser. javascript was chosen as the coding language for this reason. In addition, this allows me to run the program without having to use a compiler. (I had originally planned to code MermerSoftPaint in OpenGl, this did not go well).
### drawing algorithms
#### I am pretty interested in graphics programming. Because of this, i wanted to create drawing algorithms myself rather than using a library. One algorithm, of my own design, draws a pixelated circle of a specified radius for use as a brush image. The other algorithm is an implementation of Bresenham's line algorithm, which I discovered through this project ("Bresenham’s line algorithm," 2023). One downside of this is that my implementations are certainly less efficient than established alternatives. In addition, I didn't implement antialiasing.
### outdated style
#### part of the appeal of deprecated painting softwares is that they are extremely limited. This, strangely enough, makes them excellent learning tools for artists. Thus, my drawing program only has a few features: an eraser, a pen, brush size input, an undo button, a color picker, the ability to make a new canvas, and the ability to save.

## Bibliography:

Anson Alexander (Director). (2020, February 5). GitHub Tutorial—Beginner’s Training Guide. https://www.youtube.com/watch?v=iv8rSLsi1xo

Bresenham’s line algorithm. (2023). In Wikipedia. https://en.wikipedia.org/w/index.php?title=Bresenham%27s_line_algorithm&oldid=1186441766

freeCodeCamp.org (Director). (2021, September 30). Git for Professionals Tutorial—Tools & Concepts for Mastering Version Control with Git. https://www.youtube.com/watch?v=Uszj_k0DGsg

Programming with Mosh (Director). (2020, September 15). Git Tutorial for Beginners: Learn Git in 1 Hour. https://www.youtube.com/watch?v=8JJ101D3knE

Franks laboratory (Director). (2020, October 30). JavaScript Pixel Manipulation for Beginners. https://www.youtube.com/watch?v=alRBeUMMvDM



