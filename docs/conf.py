# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = "sphinx-detail-view"
copyright = "2023, Namnn"
author = "Namnn"
release = "0.1.0"

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

# extensions = [
#     'sphinx_needs',
#     'sphinx_detail_view']

detail_view_config = {
    "selector": "div.needs_head > div.line",
    "not_selector": "a, h1 a, h2 a",
    "set_icon": True,
    "icon_only": True,
    "icon_click": True,
    "icon": "  ☛",
    "width": 500,
    "height": 400,
    "offset": {"left": 20, "top": 20},
    "timeout": 500,
}

needs_build_json_per_id = True

templates_path = ["_templates"]
exclude_patterns = ["_build", "Thumbs.db", ".DS_Store"]


# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = "alabaster"
html_static_path = ["_static"]

html_theme_options = {
    "logo": "sphinx-preview-logo.png",
    "logo_name": False,
    "logo_text_align": "center",
    # 'github_user': 'useblocks',
    # 'github_repo': 'sphinx-preview',
    "github_banner": True,
    "github_button": True,
    "github_type": "star",
    "fixed_sidebar": True,
    # 'extra_nav_links': {'PyPi': "https://pypi.python.org/pypi/sphinx-preview",
    #                     'github': "https://github.com/useblocks/sphinx-preview",
    #                     }
}


html_sidebars = {
    "**": [
        "about.html",
        "navigation.html",  # Reactivate if subpages get added
        "relations.html",
        "searchbox.html",
    ]
}
