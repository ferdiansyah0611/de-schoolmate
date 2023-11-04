import style from "../../styles/app/bookmark.module.css";
import { useEffect, useState } from "react";
import useBookmark from "../../stores/useBookmark";
import {
	Button,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
	IconButton,
	Input,
	Menu,
	MenuHandler,
	MenuItem,
	MenuList,
	Tab,
	TabPanel,
	Tabs,
	TabsBody,
	TabsHeader,
	Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export default function Bookmark() {
	const navigate = useNavigate();

	const [dialogAddBookmark, setDialogAddBookmark] = useState({
		open: false,
		id: null,
		folderId: null,
		title: "",
		url: "",
	});
	const [dialogAddFolder, setDialogAddFolder] = useState({
		open: false,
		id: null,
		name: "",
	});

	const bookmark = useBookmark();
	useEffect(() => {
		document.body.classList.add("app");
		return () => {
			document.body.classList.remove("app");
		};
	}, []);
	useEffect(() => {
		if (!bookmark.folder.length) return;
		updateTabActive(bookmark.folder[0].id);
	}, [bookmark.folder]);

	function handlerDialogAddBookmark(e) {
		const { name, value } = e.target;
		setDialogAddBookmark((prev) => ({
			...prev,
			[name]: value,
		}));
	}
	function toggleDialogAddBookmark() {
		setDialogAddBookmark((prev) => ({
			...prev,
			open: !prev.open,
		}));
	}
	function resetDialogAddBookmark() {
		setDialogAddBookmark({
			open: false,
			id: null,
			folderId: null,
			title: "",
			url: "",
		});
	}
	function saveBookmark() {
		if (!bookmark.folder.length) return;
		// do edit
		if (dialogAddBookmark.id) {
			bookmark.updateBookmark(dialogAddBookmark.folderId, dialogAddBookmark.id, {
				title: dialogAddBookmark.title,
				url: dialogAddBookmark.url,
			});
		}
		// do create
		else {
			bookmark.pushBookmark(dialogAddBookmark.folderId || bookmark.folder[0].id, {
				id: crypto.randomUUID(),
				title: dialogAddBookmark.title,
				url: dialogAddBookmark.url,
			});
		}
		// reset state
		resetDialogAddBookmark();
	}
	function updateTabActive(folderId) {
		setDialogAddBookmark((prev) => ({
			...prev,
			folderId,
		}));
	}
	function clickEditBookmark(folderId, data) {
		setDialogAddBookmark({
			open: true,
			id: data.id,
			folderId,
			title: data.title,
			url: data.url,
		});
	}

	/*folder*/
	function toggleDialogAddFolder() {
		setDialogAddFolder((prev) => ({
			...prev,
			open: !prev.open,
		}));
	}
	function handlerDialogAddFolder(e) {
		const { name, value } = e.target;
		setDialogAddFolder((prev) => ({
			...prev,
			[name]: value,
		}));
	}
	function resetDialogAddFolder() {
		setDialogAddFolder({
			open: false,
			id: null,
			name: "",
		});
	}
	function saveFolder() {
		// do edit
		if (dialogAddFolder.id) {
			bookmark.updateFolder(dialogAddFolder.id, {
				name: dialogAddFolder.name
			})
		}
		// do commit
		else {
			bookmark.pushFolder({
				id: crypto.randomUUID(),
				name: dialogAddFolder.name,
				data: []
			})
		}

		resetDialogAddFolder()
	}
	return (
		<main>
			<section className="max-w-5xl m-auto mt-10">
				<div className="flex mb-4">
					<div className="flex-1">
						<Typography color="white" variant="h4">Bookmark</Typography>
					</div>
					<div className="flex gap-2">
						<IconButton color="deep-purple" onClick={toggleDialogAddFolder}>
							<span className="material-symbols-outlined">add</span>
						</IconButton>
						<IconButton color="indigo" onClick={() => navigate("/app")}>
							<span className="material-symbols-outlined pl-2">arrow_back_ios</span>
						</IconButton>
					</div>
				</div>
				<Tabs value={dialogAddBookmark.folderId || (bookmark.folder.length ? bookmark.folder[0].id : "")}>
					<TabsHeader>
						{bookmark.folder.map(({ name, id }) => (
							<Tab key={id} value={id} onClick={() => updateTabActive(id)} onContextMenu={(e) => {
								e.preventDefault();
								setDialogAddFolder({
									id, name,
									open: true,
								});
							}}>
								{name}
							</Tab>
						))}
					</TabsHeader>
					<TabsBody
						animate={{
							initial: { y: 250 },
							mount: { y: 0 },
							unmount: { y: 250 },
						}}
						className="mt-4"
					>
						{bookmark.folder.map(({ id, data }) => (
							<TabPanel key={id} value={id} style={{maxHeight: '75vh', colorScheme: 'dark'}} className="overflow-auto">
								<div className={style.row}>
									<div onClick={toggleDialogAddBookmark}>
										<span className="material-symbols-outlined text-5xl">add</span>
									</div>
									{data.map((item) => (
										<div key={item.url}>
											<div className={style.menu_action}>
												<Menu placement="bottom-end">
													<MenuHandler>
														<IconButton color="indigo" size="sm">
															<span className="material-symbols-outlined text-sm">settings</span>
														</IconButton>
													</MenuHandler>
													<MenuList>
														<MenuItem onClick={() => clickEditBookmark(id, item)}>Edit</MenuItem>
														<MenuItem onClick={() => bookmark.deleteBookmark(id, item.id)}>Remove</MenuItem>
													</MenuList>
												</Menu>
											</div>
											<div className={style.root_icon}>
												<img src={`https://www.google.com/s2/favicons?sz=32&domain_url=${item.url}`} alt="favicon" />
											</div>
											<div className="p-2">
												<p className="text-sm">{item.title}</p>
											</div>
										</div>
									))}
								</div>
							</TabPanel>
						))}
					</TabsBody>
				</Tabs>
			</section>
			{/*dialog bookmark*/}
			<Dialog open={dialogAddBookmark.open} handler={toggleDialogAddBookmark} size="xs">
				<DialogHeader className="border-b border-gray-300">
					{dialogAddBookmark.id ? "Edit Bookmark" : "Add Bookmark"}
				</DialogHeader>
				<DialogBody>
					<div className="flex flex-col items-center gap-2">
						<Input
							value={dialogAddBookmark.title}
							onChange={handlerDialogAddBookmark}
							type="text"
							label="Title"
							name="title"
						/>
						<Input
							value={dialogAddBookmark.url}
							onChange={handlerDialogAddBookmark}
							type="text"
							label="URL"
							name="url"
						/>
					</div>
				</DialogBody>
				<DialogFooter className="gap-2">
					<Button onClick={saveBookmark} color="indigo">
						Submit
					</Button>
					<Button
						onClick={resetDialogAddBookmark}
						color="red"
					>
						Cancel
					</Button>
				</DialogFooter>
			</Dialog>
			{/*dialog folder*/}
			<Dialog open={dialogAddFolder.open} handler={toggleDialogAddFolder} size="xs">
				<DialogHeader className="border-b border-gray-300">
					{dialogAddFolder.id ? "Edit Folder" : "Add Folder"}
				</DialogHeader>
				<DialogBody>
					<div className="flex flex-col items-center gap-2">
						<Input
							value={dialogAddFolder.name}
							onChange={handlerDialogAddFolder}
							type="text"
							label="Name"
							name="name"
						/>
					</div>
				</DialogBody>
				<DialogFooter className="gap-2">
					<Button onClick={saveFolder} color="indigo">
						Submit
					</Button>
					<Button
						onClick={resetDialogAddFolder}
						color="red"
					>
						Cancel
					</Button>
				</DialogFooter>
			</Dialog>
		</main>
	);
}