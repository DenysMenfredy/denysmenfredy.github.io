---
title: 'Basic Data Types: Strings'
description: 'strings definition and manipulation.'
tags: ['coding', 'data structures']
---

# Strings:
A string is a data type that represents text. Think of it as a sequence of characters (letters, numbers, symbols, or spaces) grouped together.

>*Note: The code presented here is for the programming language Python*

**Examples:**
- `"Hello, World!"`
- `"123"`
- `"user@email.com"`

## Creating Strings

Strings are created by wrapping text in quotes:

```
name = "Alice"
message = 'Hello there'
```

Most languages accept both single (`'`) and double (`"`) quotes.

## Common String Operations

### Concatenation (Joining Strings)
Combining two or more strings together:
```
first_name = "John"
last_name = "Doe"
full_name = first_name + " " + last_name  # Result: "John Doe"
```

### Length
Finding how many characters are in a string:
```
message = "Hello"
length = len(message)  # Result: 5
```

### Accessing Characters
Strings are indexed, meaning each character has a position (starting at 0):
```
word = "Python"
first_letter = word[0]   # Result: "P"
third_letter = word[2]   # Result: "t"
```

### Case Conversion
Changing text to uppercase or lowercase:
```
text = "Hello World"
upper = text.upper()     # Result: "HELLO WORLD"
lower = text.lower()     # Result: "hello world"
```

*For more string operations in Python, [see](https://docs.python.org/3/library/string.html).*

## Special Characters

Some characters need special notation:

- `\n` - New line (creates a line break)
- `\t` - Tab (adds indentation)
- `\\` - Backslash (the actual \ character)
- `\"` - Quote mark inside a string

**Example:**
```
message = "Line 1\nLine 2"
```

## String Immutability

Strings cannot be changed after creation. When you modify a string, you're actually creating a new one:

```
word = "Hello"
word = word + " World"  # Creates a NEW string "Hello World"
```

## Common Mistakes

1. **Mixing quote types incorrectly**
   - Wrong: `"Hello'`
   - Right: `"Hello"` or `'Hello'`

2. **Forgetting quotes**
   - Wrong: `name = Hello`
   - Right: `name = "Hello"`

3. **Confusing strings with numbers**
   - `"5" + "3"` gives `"53"` (text)
   - `5 + 3` gives `8` (math)


## Key Takeaways

- Strings hold text data and are created with quotes
- You can join, slice, and transform strings
- Strings start counting at position 0
- Once created, strings don't change—operations create new strings
- String `"5"` is different from number `5`