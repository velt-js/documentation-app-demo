import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VeltService } from '../../services/velt.service';
import { Editor } from '@tiptap/core';

import { addTiptapVeltComment } from '@veltdev/tiptap-velt-comments';

@Component({
	selector: 'app-toolbar',
	standalone: true,
	imports: [CommonModule],
	styleUrl: './toolbar.component.scss',
	templateUrl: './toolbar.component.html',
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ToolbarComponent implements OnInit {
	isDarkMode = false;

	@Input() editor!: Editor;

	constructor(private veltService: VeltService) { }

	ngOnInit() {
		this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
		this.updateColorScheme();
		console.log(Editor);

	}

	// Change theme when user clicks on theme button
	toggleDarkMode() {
		this.isDarkMode = !this.isDarkMode;
		this.updateColorScheme();
	}

	// Update HTML & Velt Color theme 
	private updateColorScheme() {
		document.body.style.colorScheme = this.isDarkMode ? 'dark' : 'light';
		this.veltService.setDarkMode(this.isDarkMode);
	}

	addImage(editor: Editor) {
		const url = window.prompt('URL');

		if (url) {
			editor.chain().focus().setImage({ src: url }).run();
		}
	}



	addTiptapVeltComment = (editor: Editor) => {
		addTiptapVeltComment(editor);
	}
}
