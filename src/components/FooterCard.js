export default function FooterCard() {
	return (
		<div className="relative flex flex-row bg-base-200">
			<img
				src="https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
				className="object-cover w-auto h-['50%'] bg-contain rounded-lg shadow-2xl"
			/>
			<div className="absolute bottom-0 left-0 h-['50%']">
				<p className="bg-gray-200">some bullshit</p>
			</div>
		</div>
	);
}
