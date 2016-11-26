default: styles script manifest imgs

release: default extension zip

styles:
	sass src/styles.sass dist/styles.css

script:
	cp src/script.js dist/script.js

manifest:
	cp src/manifest.json dist/manifest.json

imgs:
	cp -r img dist                           && \
	cp dist/img/cube.png dist/img/cube48.png && \
	cp dist/img/cube.png dist/img/cube16.png && \
	sips -Z 48 dist/img/cube48.png           && \
	sips -Z 16 dist/img/cube16.png

extension:
	chrome --pack-extension=dist/ --pack-extension-key=cstimer.pem && \
		mv dist.crx dist/cstimer.crx

zip:
	zip -r cstimer.zip dist
