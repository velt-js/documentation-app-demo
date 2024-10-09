import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TiptapComponent } from './components/tiptap/tiptap.component';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';


import { AuthService } from './services/auth.service';
import { VeltService } from './services/velt.service';

import { Content, Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'

import { TiptapVeltComments } from '@veltdev/tiptap-velt-comments';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, TiptapComponent, SidebarComponent, ToolbarComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppComponent implements OnInit, OnDestroy {
	title = 'tiptap-angular';


	editor = new Editor({
		extensions: [
			TiptapVeltComments,
			StarterKit,
			Placeholder,
			Underline,
			TextAlign,
			Image
		],
		editorProps: {
			attributes: {
				spellCheck: 'false',
			},
		},
	});


	value: Content = `<h1>Founder Mode</h1>

<h3>September 2024</h3>


<p>At a YC event last week Brian Chesky gave a talk that everyone who was there will remember. Most founders I talked to afterward said it was the best they'd ever heard. Ron Conway, for the first time in his life, forgot to take notes. I'm not going to try to reproduce it here. Instead I want to talk about a question it raised.
<br/>
<br/>
The theme of Brian's talk was that the conventional wisdom about how to run larger companies is mistaken. As Airbnb grew, well-meaning people advised him that he had to run the company in a certain way for it to scale. Their advice could be optimistically summarized as <strong><em>"hire good people and give them room to do their jobs."</em></strong>  He followed this advice and the results were disastrous. So he had to figure out a better way on his own, which he did partly by studying how Steve Jobs ran Apple. So far it seems to be working. Airbnb's free cash flow margin is now among the best in Silicon Valley.</p>`


	constructor(
		private veltService: VeltService,
		private authService: AuthService,
	) {

		const storedContent = localStorage.getItem('tiptapContent');
		if (storedContent) {
			this.value = JSON.parse(storedContent);
		}

		this.editor.on('blur', () => {
			localStorage.setItem('tiptapContent', JSON.stringify(this.editor.getHTML()));
		});

	}

	async ngOnInit(): Promise<void> {

		// Initialize Velt with the API key
		await this.veltService.initializeVelt('AN5s6iaYIuLLXul0X4zf');

		// Identify the current user if authenticated
		const user = this.authService.userSignal();
		if (user) {
			await this.veltService.identifyUser(user);
		}

	}


	ngOnDestroy(): void {
		this.editor.destroy();
	}

}
