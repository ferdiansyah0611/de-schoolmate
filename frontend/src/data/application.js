const application = [
	compact(
		"Calender",
		`A calendar feature on a website is a tool that allows 
		users to view and organize events, tasks, and other 
		appointments on a digital calendar.`,
		"calendar_month",
		"/app/calender"
	),
	compact(
		"Note",
		`A note making feature on a website is a tool that allows 
		users to create and store short text-based notes or memos.`,
		"sticky_note_2",
		"/app/note"
	),
	compact(
		"Timer",
		`A timer feature on a website is a tool that helps users manage 
		their time more effectively by breaking their work or study 
		sessions into smaller, more manageable chunks.`,
		"timer",
		"/app/timer"
	),
	compact(
		"Todo List",
		`A todos list feature on a website is a tool that allows users to 
		create and manage a list of tasks or items that need to be completed.`,
		"checklist",
		"/app/todolist"
	),
	compact(
		"Book Search",
		`A book search feature on a website is a tool that allows 
		users to search for books by various criteria such as title, 
		author, subject, or keyword.`,
		"book_5",
		"/app/book"
	),
	compact(
		"Tutorial Search",
		`A YouTube tutorials search feature on a website is a tool that 
		allows users to search for instructional videos on YouTube by 
		using various criteria such as keywords, categories, or specific channels.`,
		"travel_explore",
		"/app/tutorial"
	),
	compact(
		"Bookmark",
		`Save your link in bookmarks`,
		"bookmarks",
		"/app/bookmark"
	)
];

function compact(title, description, icon, url) {
	return { title, description, icon, url };
}

export default application;