function threadData() {
	let thread = [
		// Thread 0
		{
			threadTitle: "Walkman Collaboration",
			threadDateTime: "2024-02-10T16:22:34Z",
			threadStatus: {
				views: 0,
				comments: 0,
				likes: 0,
			},
			threadPosts: [
				// Post 0
				{
					postAuthor: "Hitori Gotoh",
					postDateTime: "2024-02-13T16:22:34Z", // Use ISO 8601 standard date time format
					postTitle:
						"New Collab Drop: Walkman x Tokyo Threads - Get Yours Now!",
					postStatus: {
						views: 123,
						comments: 12,
						likes: 35,
					},
					postContent:
						"🎉 Excited to announce that the latest collaboration between Walkman and Tokyo's hottest fashion labels has just hit the shelves! Swing by your nearest store to pick up the limited edition pieces before they're gone. Share your favorite finds and let's see how you're rocking the Walkman x Tokyo Threads collab! 💃👗🎧",
				},

				// Post 1
				{
					postAuthor: "Nijika Ijichi",
					postDateTime: "2024-04-27T08:45:21Z",
					postTitle:
						"Tokyo Tech: Walkman x Street Gear - Upgrade Your Style!",
					postStatus: {
						views: 1248,
						comments: 45,
						likes: 352,
					},
					postContent:
						"🔥 Tech meets style in the Walkman x Street Gear collaboration! Whether you're a gadget guru or a fashion-forward trendsetter, this fusion of technology and streetwear is sure to elevate your style game. Share your thoughts on this innovative collaboration and how you're incorporating it into your wardrobe! 💻👟🎧📱🕶️",
				},

				// Post 2
				{
					postAuthor: "Ryo Yamada",
					postDateTime: "2024-06-15T11:59:00Z",
					postTitle:
						"Limited Edition: Walkman x Bocchi The Rock! - Rock 'n Roll!",
					postStatus: {
						views: 2015,
						comments: 75,
						likes: 642,
					},
					postContent:
						"🎉 Exciting news! Walkman x 'Bocchi The Rock!' limited edition gear is now available at the AniPlex Spring Fair! Grab exclusive Blu-rays 📀, collectible postcards 📬, and life-size standees 🎤. Perfect for any fan - don't miss out! 🤩",
				},

				// Post 3
				{
					postAuthor: "Ikuyo Kita",
					postDateTime: "2024-07-01T12:00:00Z",
					postTitle:
						"Cross-country Collab: Walkman x SHEIN - Don't Miss Out!",
					postStatus: {
						views: 533,
						comments: 32,
						likes: 145,
					},
					postContent:
						"Walkman x SHEIN collab is here! 🎉 Get limited edition graphic tees, hoodies, and Walkman-themed bags. Perfect blend of music and fashion. Hurry, they're selling fast! Who's got theirs? Share your picks!",
				},
			],
		},

		// Thread 1
		{
			threadTitle: "AniPlex Spring Fair",
			threadDateTime: "2024-10-29T12:00:00Z",
			threadStatus: {
				// views: 21912,
				// comments: 1378,
				// likes: 8967,
				views: 0,
				comments: 0,
				likes: 0,
			},
			threadPosts: [
				// Post 0
				{
					postAuthor: "Nijika Ijichi",
					postDateTime: "2024-10-31T05:33:12Z",
					postTitle:
						"Exclusive Sneak Peek: Limited Edition Figures Unveiled",
					postStatus: {
						views: 634,
						comments: 54,
						likes: 139,
					},
				},

				// Post 1
				{
					postAuthor: "Ikuyo Kita",
					postDateTime: "2024-11-01T12:00:00Z",
					postTitle:
						"Cosplay Contest Announcement: Show off Your Best Anime-Inspired Outfits!",
					postStatus: {
						views: 5248,
						comments: 274,
						likes: 734,
					},
					postContent:
						"🌟 Calling all cosplayers! The AniPlex Spring Fair is hosting a cosplay contest with amazing prizes up for grabs. Whether you're dressing up as your favorite character from 'My Hero Academia,' 'Sword Art Online,' or any other AniPlex title, strut your stuff and showcase your creativity. Don't miss this chance to shine! ✨🎭🏆",
				},

				// Post 2
				{
					postAuthor: "Hitori Gotoh",
					postDateTime: "2024-09-25T09:56:41Z",
					postTitle: "Anime Merch: Limited Edition Figures Unveiled",
					postStatus: {
						views: 2015,
						comments: 75,
						likes: 642,
					},
				},

				// Post 3
				{
					postAuthor: "Ryo Yamada",
					postDateTime: "2024-11-12T20:37:28Z",
					postTitle:
						"Virtual Reality Experience: Step into the World of 'Sword Art Online'",
					postStatus: {
						views: 14015,
						comments: 975,
						likes: 7452,
					},
					postContent:
						"🎮 Embark on an epic adventure without leaving your seat! The AniPlex Spring Fair is offering a virtual reality experience where you can immerse yourself in the world of 'Sword Art Online.' Explore breathtaking landscapes, battle fierce monsters, and live out your SAO fantasies. Are you ready to dive in? ⚔️🌟🎮",
				},
			],
		},
	];

	function calcStatus(thread, status) {
		let total = 0;

		thread.threadPosts.forEach((post) => {
			// console.log(`${post.postStatus[status]}`);
			total += post.postStatus[status];
		});

		// console.log(`Total ${status} of "${thread.threadTitle}": ${total}`);
		return total;
	}

	for (const threadItem of thread) {
		threadItem.threadStatus.views = calcStatus(threadItem, "views");
		threadItem.threadStatus.comments = calcStatus(threadItem, "comments");
		threadItem.threadStatus.likes = calcStatus(threadItem, "likes");

		let threadDateTime = new Date(threadItem.threadDateTime);
		threadItem.threadDate = `${threadDateTime.getMonth()}.${threadDateTime.getDate()}.${threadDateTime.getFullYear()}`;

		threadItem.threadPosts.forEach((post) => {
			let postDateTime = new Date(post.postDateTime);
			post.postDate = `${postDateTime.getMonth()}.${postDateTime.getDate()}.${postDateTime.getFullYear()}`;
		});
	}

	return thread;
}

export let thread = threadData();
// console.log(thread);
