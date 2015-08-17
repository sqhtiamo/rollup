export default function getExportBlock ( bundle, exportMode, mechanism = 'return' ) {
	if ( exportMode === 'default' ) {
		const defaultExport = bundle.entryModule.exports.default;

		const defaultExportName = bundle.entryModule.replacements.default ||
			defaultExport.identifier;

		return `${mechanism} ${defaultExportName};`;
	}

	return bundle.toExport
		.map( name => {
			const prop = name === 'default' ? `['default']` : `.${name}`;
			const reexport = bundle.entryModule.reexports[ name ];
			name = reexport ?
				bundle.traceExport( bundle.entryModule, name ) :
				bundle.trace( bundle.entryModule, name );
			return `exports${prop} = ${name};`;
		})
		.join( '\n' );
}
