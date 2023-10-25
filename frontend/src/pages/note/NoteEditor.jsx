import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import useNotes from "../../stores/useNotes";

export default function NoteEditor() {
	const navigate = useNavigate()
	const params = useParams()
	const notes = useNotes();

	useEffect(() => {
		if (tinymce.activeEditor) return;
		const id = params.id || crypto.randomUUID();

		tinymce.init({
		  selector: 'textarea#default-editor',
		  promotion: false,
		  plugins: 'undo redo save pagebreak table lists advlist accordion anchor codesample link image emoticons insertdatetime searchreplace fullscreen preview visualblocks wordcount help',
		  toolbar: 'undo redo save | blocks bold italic underline strikethrough | link image table numlist accordion anchor codesample emoticons insertdatetime pagebreak | searchreplace preview help',
		  setup(editor) {
		  	editor.on('init', () => {
					editor.execCommand('mceFullScreen');
					const current = notes.data.find(item => item.id === params.id);
					if (!current) return;
					tinyMCE.activeEditor.setContent(current.description);
		  	})
		  },

		  image_uploadtab: false,
		  save_onsavecallback() {
		  	const commit = {
		  		description: tinymce.activeEditor.getContent()
		  	}
		  	// do create
		  	if (!params.id) {
		  		notes.push({ id, ...commit })
		  		return navigate("/app/note/editor/" + id);
		  	}
		  	// do update
		  	else {
		  		notes.update(id, commit)
		  	}
		  }
		});
		 return () => {
		 	tinymce.activeEditor.remove();
		 }
	}, [params.id])
	return (
		<main>
			<section className="app-container">
				<textarea className="hidden" id="default-editor"></textarea>
			</section>
		</main>
	)
}