import requests
import os

# Create a directory to store the licenses
os.makedirs('licenses', exist_ok=True)

# Expanded list of licenses to fetch from GitHub API
license_keys = [
    "mit",
    "apache-2.0",
    "gpl-3.0",
    "bsd-3-clause",
    "bsd-2-clause",
    "cc0-1.0",
    "cc-by-4.0",
    "cc-by-sa-4.0",
    "epl-2.0",
    "agpl-3.0",
    "gpl-2.0",
    "lgpl-2.1",
    "mpl-2.0",
    "unlicense",
    "artistic-2.0",
    "bsl-1.0",
    "isc",
    "ncsa",
    "ofl-1.1",
    "osl-3.0",
    "postgresql",
    "zlib",
    "wtfpl",
    "x11",
    "eupl-1.1",
    "lppl-1.3c",
    "ms-pl",
    "ms-rl",
    "ecl-2.0",
    "afl-3.0",
    "apache-1.1",
    "bsd-4-clause",
    "cddl-1.0",
    "cecill-2.1",
    "cpl-1.0",
    "epl-1.0",
    "gpl-1.0",
    "lgpl-3.0",
    "mit-0",
    "mpl-1.1",
    "osl-2.1",
    "cc-by-3.0",
    "cc-by-nc-4.0",
    "cc-by-nd-4.0",
    "cc-by-nc-nd-4.0",
    "cc-by-nc-sa-4.0"
]

# Function to fetch and format license data
def fetch_and_format_license(license_key):
    url = f"https://api.github.com/licenses/{license_key}"
    response = requests.get(url)
    data = response.json()

    if response.status_code == 200:
        # Prepare the markdown content
        md_content = f"""---
{data['name']}
Commercial Yes
Distribution Yes
Modification Yes
Private Yes
Liability No
Warranty No
---

{data['body']}
"""

        # Save to a markdown file
        file_name = f"licenses/{license_key}.md"
        with open(file_name, "w") as file:
            file.write(md_content)
        print(f"Saved {data['name']} to {file_name}")
    else:
        print(f"Failed to fetch license for {license_key}: {data.get('message', 'Unknown error')}")

# Fetch and save each license
for key in license_keys:
    fetch_and_format_license(key)
