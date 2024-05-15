function threadData() {
	let thread = [
		// Thread 0
		{
			threadTitle: "Walkman Collaboration",
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
				},
			],
		},

		// Thread 1
		{
			threadTitle: "AniPlex Spring Fair",
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
	}

	return thread;
}

export let thread = threadData();
// console.log(thread);
