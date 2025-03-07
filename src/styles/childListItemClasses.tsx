const classes = {
	childRow: `
		cursor-pointer
		border 
		rounded-sm 
		border-dashed 
		border-transparent 
		py-1
		pl-10
		hover:border-green-500
		hover:bg-green-100 
	`,
	hasActiveOrSavedMapping: `
		bg-green-100
	`,
	savedButUpdated: `
		bg-red-100!
	`,
} as const;

export default classes;
