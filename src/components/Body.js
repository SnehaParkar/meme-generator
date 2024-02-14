import React from "react";

export default function Body() {

	// save the meme-related data as an object called `meme
	const [meme, setMeme] = React.useState({
		topText: "One does not simply",
		bottomText: "walk into Mordor",
		randomImage: "http://i.imgflip.com/1bij.jpg",
	});

	// Create a state to mantain all memes images
	const [allMemes, setAllMemes] = React.useState([]);

	// As soon as the Meme component loads the first time, make an API call to "https://api.imgflip.com/get_memes"
	// When the data comes in, save just the memes array part of that data to the `allMemes` state

	// useEffect takes a function as its parameter. If that function
	// returns something, it needs to be a cleanup function. Otherwise,
	// it should return nothing. If we make it an async function, it
	// automatically returns a promise instead of a function or nothing.
	// Therefore, if you want to use async operations inside of useEffect,
	// you need to define the function separately inside of the callback
	// function, as seen below:

	React.useEffect(() => {
		async function getMemes() {
			const res = await fetch("https://api.imgflip.com/get_memes");
			const data = await res.json();
			setAllMemes(data.data.memes);
		}
		getMemes();
	}, []);

	function handleChange(event) {
		const { name, value } = event.target;
		setMeme((prevMeme) => {
			// Set a new state with old value but dynamically update value of name property (from one form's input)
			return { ...prevMeme, [name]: value };
		});
	}

	function getMemeImage() {
		const randomNumber = Math.floor(Math.random() * allMemes.length);
		const url = allMemes[randomNumber].url;
		//  update the `meme.randomImage` state to be the random chosen image URL
		setMeme((prevState) => {
			return { ...prevState, randomImage: url };
		});
	}

	return (
		<div className="page-section">
			<div className="form-section">
				<div className="form-component">
					<label className="input-label">Top Text</label>
					<input className="input-form"
						type="text"
						name="topText"
						placeholder="Top text"
						value={meme.topText}
						onChange={handleChange}
					/>
				</div>
				<div className="form-component">
					<label className="input-label">Bottom Text</label>
					<input className="input-form"
						type="text"
						name="bottomText"
						placeholder="Bottom text"
						value={meme.bottomText}
						onChange={handleChange}
					/>
				</div>
			</div>
			<button className="button-form" onClick={getMemeImage}>
				<span>Get a new meme image 📸</span>
			</button>

			<div className="meme-section">
				<div className="meme--text top">{meme.topText}</div>
				<div className="meme--text bottom">{meme.bottomText}</div>
				<img src={meme.randomImage} alt="meme" className="meme-image" />
			</div>
		</div >
	);
}

