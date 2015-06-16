var Hoodwrap = React.createClass({
	render: function() {
		return (
			<main className="sidebar">
				<p>This is the Wrapping element</p>
				<Hoodheader />
				<Hoodfeed />
			</main>
		);
	}
});