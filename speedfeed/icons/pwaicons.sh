declare -a arr=("16" "32" "48" "96" "192" "512")

for i in "${arr[@]}"
do
	inkscape -z --export-filename $i.png -w $i -h $i favicon.svg
done

convert 16.png 32.png 48.png favicon.ico
rm 16.png 32.png 48.png

inkscape -z --export-filename apple-touch-icon.png -w 180 -h 180 favicon.svg
inkscape -z --export-filename maskable512.png -w 512 -h 512 favicon-maskable.svg