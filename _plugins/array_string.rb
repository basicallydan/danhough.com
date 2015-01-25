module Jekyll
	module StringArray
		def to_numbers(input)
			output = input.map(&:to_i)
			output
		end
	end
end


Liquid::Template.register_filter(Jekyll::StringArray)