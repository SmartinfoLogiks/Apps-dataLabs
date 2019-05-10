module.exports = {
	menuData : [
		{
			label: "File",
			submenu: [{
					label: 'About',
					click: _ => {
						console.log('clicked');
					}
				},
				{
					type: 'separator'
				},
				{
					label: 'Quit',
					accelerator: 'CommandOrControl+Q',
					click: _ => {
						remote.app.quit();
					}
				}
			]
		},
		{
			label: "File",
			submenu: [{
					label: 'About',
					click: _ => {
						console.log('clicked');
					}
				},
				{
					type: 'separator'
				},
				{
					label: 'Quit',
					accelerator: 'CommandOrControl+Q',
					click: _ => {
						remote.app.quit();
					}
				}
			]
		},
		{
			label: "Edit",
			submenu: [{
					label: 'About',
					click: _ => {
						console.log('clicked');
					}
				},
				{
					type: 'separator'
				},
				{
					label: 'Quit',
					accelerator: 'CommandOrControl+Q',
					click: _ => {
						remote.app.quit();
					}
				}
			]
		}
	]
}