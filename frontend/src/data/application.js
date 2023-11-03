const application = [
	compact(
		"Book Search",
		`A book search feature on a website is a tool that allows 
		users to search for books by various criteria such as title, 
		author, subject, or keyword.`,
		"book_5"
	),
	compact(
		"Calender",
		`A calendar feature on a website is a tool that allows 
		users to view and organize events, tasks, and other 
		appointments on a digital calendar.`,
		"calendar_month"
	),
	compact(
		"Note",
		`A note making feature on a website is a tool that allows 
		users to create and store short text-based notes or memos.`,
		"sticky_note_2"
	),
	compact(
		"Timer",
		`A timer feature on a website is a tool that helps users manage 
		their time more effectively by breaking their work or study 
		sessions into smaller, more manageable chunks.`,
		"timer"
	),
	compact(
		"Todo List",
		`A todos list feature on a website is a tool that allows users to 
		create and manage a list of tasks or items that need to be completed.`,
		"checklist"
	),
	compact(
		"Tutorial Search",
		`A YouTube tutorials search feature on a website is a tool that 
		allows users to search for instructional videos on YouTube by 
		using various criteria such as keywords, categories, or specific channels.`,
		"travel_explore"
	),
];

function compact(title, description, icon) {
	return { title, description, icon };
}

export default application;