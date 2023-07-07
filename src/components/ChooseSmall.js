export default function ChooseSmall() {
	return (
		<div className="text-gray-800 bg-[#F29727]">
			<div className="items-center text-center card-body">
				<h2 className="text-right text-8xl card-title">Mood</h2>
				<h5 className="text-3xl text-right card-title">
					Choose the activity you want
				</h5>
				<p className="my-4 text-2xl">
					You can choose between our categories depending on your mood. From
					land activities like hiking, to water-sports, to city treasure hunt.
				</p>
				<div className="flex flex-col justify-end card-actions">
					<h1>Choose your category</h1>
					<div className="relative h-20 w-72">
						<h5 className="absolute top-0 left-0 p-3 text-xl">Land 🌄</h5>
						<h5 className="absolute bottom-0 right-0 p-3 text-xl">Water 🏄‍♀️</h5>
						<h5 className="absolute top-0 right-0 p-3 text-xl">Cultural 🗿</h5>

						<h5 className="absolute bottom-0 left-0 p-3 text-xl">
							Catergory 🪂
						</h5>
					</div>
				</div>
			</div>
		</div>
	);
}
