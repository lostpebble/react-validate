export const validatorError = value =>
  `	\<Validate\> A validator function failed to validate the value: ${value}
			
		Some potential causes:
			
		-You may have forgotten to specify a value prop for the component you're validating, so it is uncontrolled.
			
			-If you want to validate an uncontrolled component (i.e. no value prop)
			 	then the value is being interpreted from the onChange function on the
			 	component. To specify how the value is interpreted make sure you have
			 	correctly specified the following props on \<Validate\>:
			 	 
			 	onChangeValueKeys (when a value enters the onChange handler, sometimes it
			 	 is nested within an object. Specify the keys needed to find the value here. 
			 	 Default: ['target', 'value'] - which is the most common for interpreting 
			 	 HTML input events, i.e. event.target.value. If the value comes into the 
			 	 onChange function unnested, simply pass an empty array: [])
			 	 
			 	onChangeValuePosition (the argument position that the value enters the onChange function. 
			 	 Default (first argument): 0)
			 	 
			 	e.g. \<Validate ... onChangeValueKeys={[]} onChangeValuePosition={2} \>
			 	 
		-If the value prop on the child component has a different name, specify it in the propForValue prop
		 e.g \<Validate ... propForValue="percentComplete" \>
		
		-Make sure your validator function can handle the value being passed to it (i.e. string, number etc.)
		
		-Make sure your validator function takes only one argument (the value to validate).`;
