export default function WelcomeCard() {
	return (
		<div
			className="h-screen text-black hero"
			style={{ backgroundColor: "#22A699" }}
		>
			<div className="flex-col hero-content lg:flex-row">
				<img
					src="https://www.windsorgreatpark.co.uk/wp-content/uploads/2022/11/38.-Swinley-Forest-scaled.jpg"
					alt=""
					className="max-w-xl rounded-lg shadow-2xl"
				/>
				<div>
					<h1 className="p-4 text-8xl">Welcome To RootSeeker</h1>
					<p className="py-6 text-xl text-right">
						...A window to outdoor oportunities
					</p>
				</div>
			</div>
		</div>
	);
}
