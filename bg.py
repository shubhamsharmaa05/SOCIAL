import os

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    
    if filepath.endswith('index.css'):
        new_content = new_content.replace('@apply bg-background text-foreground;', '@apply insta-gradient text-foreground min-h-screen background-fixed;')
        new_content = new_content.replace('@apply bg-[#121212] border border-[#363636];', '@apply bg-black/60 backdrop-blur-xl border border-white/20;')
        new_content = new_content.replace('@apply bg-[#121212] border border-[#363636] rounded-xl transition-all duration-300;', '@apply bg-black/50 backdrop-blur-xl border border-white/20 rounded-xl transition-all duration-300;')
        if 'background-fixed' not in new_content:
            new_content = new_content + '\n.background-fixed {\n  background-attachment: fixed !important;\n}\n'
            
    elif filepath.endswith('Sidebar.jsx'):
        new_content = new_content.replace('backgroundColor: "#000000"', 'backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(20px)"')
        
    elif filepath.endswith('.jsx'):
        new_content = new_content.replace('bg-black', 'bg-transparent')
        new_content = new_content.replace('bg-[#000000]', 'bg-transparent')
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Updated {filepath}')

process_file('e:/Social/FRONTEND/src/index.css')
process_file('e:/Social/FRONTEND/src/components/Sidebar.jsx')
process_file('e:/Social/FRONTEND/src/components/Topbar.jsx')
for root, _, files in os.walk('e:/Social/FRONTEND/src/pages'):
    for file in files:
        if file.endswith('.jsx'):
            process_file(os.path.join(root, file))
