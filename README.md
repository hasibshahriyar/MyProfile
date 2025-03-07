# Hey there! 👋 I'm Shahriyar Hasib

Welcome to my portfolio site's repo! I built this to showcase my journey in Data Science and my research work in DeepFake Detection. 

## What's Cool About This Site?

- A nifty particle animation that responds to your mouse movements 
- Super smooth scrolling that just feels right
- Skills section with animated progress bars (because why not?)
- Works great on your phone, tablet, or desktop
- Some fun cursor effects I added while procrastinating
- Subtle animations that bring the content to life
- Interactive elements with a magnetic hover effect (try it!)

## Built With

Just the good old trio - HTML, CSS, and vanilla JavaScript. I wanted to keep things simple and efficient:
- HTML5 for structure
- CSS3 (with modern features like custom properties)
- Plain JavaScript (no framework needed!)
- ScrollReveal.js for those sweet scroll animations
- Font Awesome icons to make things pretty

## Project Structure
Nothing fancy here, just a clean organization:
```
/
├── index.html    # Where the magic begins
├── styles.css    # Making things look good
├── scripts.js    # Where the fun stuff happens
└── assets/       # Images and other goodies
```

## Want to Run This Locally?

1. Grab the code:
```bash
git clone https://github.com/hasibshahriyar/portfolio
```

2. Fire it up:
```bash
# If you're a Python fan:
python -m http.server 5501

# Or just use VS Code's Live Server
# (Right-click on index.html -> Open with Live Server)
```

## Under the Hood

I've used some cool modern web features:
- CSS variables for easy theme tweaking
- Intersection Observer API for scroll animations
- Canvas API for that particle effect
- Grid and Flexbox for responsive layouts

## Make It Your Own

1. Want different colors? Easy! Just tweak these CSS variables:
```css
:root {
    --primary-color: #ff5722;    /* Your favorite color */
    --secondary-color: #ff7043;  /* Maybe something else? */
    --accent-color: #ff9800;     /* Go wild! */
}
```

2. The particle animation can be customized too:
```javascript
const particleSettings = {
    color: '#ff5722',  // Match your theme
    count: 50,         // More or fewer particles
    speed: 0.5        // Zoom zoom!
};
```

## Mobile-Friendly? You Bet!

I've tested this bad boy on all sorts of screens:
- Your trusty phone (320px+)
- That iPad you got for Christmas (768px+)
- Your work laptop (1024px+)
- That fancy ultrawide monitor (1440px+)

## Want to Help?

Found a bug? Got an idea? Feel free to:
- Fork it
- Fix it
- Send a PR

Just open an issue first so we can chat about it!

## License

MIT Licensed - do whatever you want with it! Just don't blame me if something breaks 😅

## Let's Connect!

- GitHub: [@hasibshahriyar](https://github.com/hasibshahriyar)
- LinkedIn: [Shahriyar Hasib](https://linkedin.com/in/hasibshahriyar)
- Drop me a line: shahriyarhasib6@gmail.com

P.S. If you're reading this far, you might as well star the repo! ⭐
