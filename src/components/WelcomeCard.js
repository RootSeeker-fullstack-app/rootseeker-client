export default function WelcomeCard() {
	return (
		<div
			className="h-auto text-black lg:h-screen hero"
			style={{ backgroundColor: "#22A699" }}
		>
			<div className="flex flex-col justify-center w-3/5 hero-content lg:flex-row">
				<img
					src="https://www.windsorgreatpark.co.uk/wp-content/uploads/2022/11/38.-Swinley-Forest-scaled.jpg"
					alt=""
					className="rounded-lg shadow-2xl lg:max-w-xl"
				/>
				<div className="w-3/5">
					<h1 className="py-5 text-4xl lg:p-4 lg:text-8xl">
						Welcome To RootSeeker 🚵‍♂️
					</h1>
					<p className="text-2xl text-right lg:py-6">
						...A window to outdoor oportunities
					</p>
				</div>
			</div>
		</div>
	);
}
