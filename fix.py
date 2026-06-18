import os

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    
    # 1. Fix Sidebar text
    new_content = new_content.replace('Growth <Box component="span" sx={{ color: "primary.main" }}>cial</Box>', 'So<Box component="span" sx={{ color: "primary.main" }}>cial</Box>')
    
    # 2. Fix colors in MUI styling
    new_content = new_content.replace('rgba(99, 102, 241, 0.2)', '#121212')
    new_content = new_content.replace('rgba(99, 102, 241, 0.5)', '#363636')
    new_content = new_content.replace('boxShadow: "0 0 15px rgba(99, 102, 241, 0.3)"', 'boxShadow: "none"')
    new_content = new_content.replace('rgba(99, 102, 241, 0.1)', '#262626')
    new_content = new_content.replace('rgba(255, 255, 255, 0.05)', '#363636')
    new_content = new_content.replace('backgroundColor: "#050505"', 'backgroundColor: "#000000"')
    
    # 3. Fix tailwind classes
    new_content = new_content.replace('text-indigo-500', 'insta-gradient-text')
    new_content = new_content.replace('bg-indigo-500/20', 'bg-[#121212] border border-[#363636]')
    new_content = new_content.replace('bg-indigo-500/10', 'bg-[#121212]')
    new_content = new_content.replace('bg-purple-500', 'insta-gradient')
    new_content = new_content.replace('bg-indigo-600', 'insta-gradient')
    new_content = new_content.replace('hover:bg-indigo-700', 'hover:opacity-90')
    new_content = new_content.replace('ring-indigo-500', 'ring-[#F50057]')
    
    new_content = new_content.replace('text-zinc-400', 'text-[#A8A8A8]')
    new_content = new_content.replace('bg-zinc-800/50', 'bg-[#121212]')
    new_content = new_content.replace('bg-zinc-800', 'bg-[#121212]')
    new_content = new_content.replace('bg-zinc-900', 'bg-[#000000]')
    new_content = new_content.replace('border-white/10', 'border-[#363636]')
    new_content = new_content.replace('border-white/5', 'border-[#363636]')
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print('Updated ' + filepath)

for root, _, files in os.walk('e:/Social/FRONTEND/src'):
    for file in files:
        if file.endswith('.jsx'):
            process_file(os.path.join(root, file))
