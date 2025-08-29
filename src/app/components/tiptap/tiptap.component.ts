import { Component, effect, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VeltService } from '../../services/velt.service';

import { Content, Editor } from '@tiptap/core';
import { NgxTiptapModule } from 'ngx-tiptap';
import { CommonModule } from '@angular/common';


import { addComment, AddCommentRequest } from '@veltdev/tiptap-velt-comments';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-tiptap',
	standalone: true,
	imports: [NgxTiptapModule, CommonModule, FormsModule],
	templateUrl: './tiptap.component.html',
	styleUrl: './tiptap.component.scss'
})
export class TiptapComponent {

	@Input() editor!: Editor;
	@Input() value!: Content;
	@Input() focusMode!: boolean;

	sub!: Subscription;
	
	// Getting the Velt Client
	client = this.veltService.clientSignal();

	constructor(
		private veltService: VeltService
	) {

		// Set Document when the velt client is initialized
		effect(() => {

			this.client = this.veltService.clientSignal();

			if (this.client) {

				// Contain your comments in a document by setting a Document ID & Name
				this.client.setDocument('tiptap-angular-demo-2', { documentName: 'tiptap-angular-demo' });

				// Enable dark mode for Velt UI
				this.client.setDarkMode(true);
			}
		});
	}

	handleValueChange(value: Content): void {
		this.value = value;
	}

	addTiptapVeltComment(editor: Editor) {
		const addCommentRequest: AddCommentRequest = {
			editor,
		};

		addComment(addCommentRequest);
	}
}
