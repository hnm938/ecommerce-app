import React from "react";
import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";

function Categories({ swal }) {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState(undefined);
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const response = await axios.get("/api/categories");
    setCategories(response.data);
  }

  async function saveCategory(e) {
    e.preventDefault();
    const data = {
      name,
      parentCategory,
      properties: properties.map((p) => ({
        name: p.name,
        values: p.values.split(","),
      })),
    };

    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put("/api/categories", data);
      setEditedCategory(null);
    } else {
      await axios.post("/api/categories", data);
    }

    setName("");
    setParentCategory("");
    setProperties([]);
    fetchCategories();
  }

  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);

    if (category.parent?._id === undefined) {
      document.querySelector("#parent-dropdown").value = 0;
    }

    setParentCategory(category.parent?._id);
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(","),
      }))
    );
  }

  async function deleteCategory(category) {
    const result = await swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete ${category.name}`,
      showCancelButton: true,
      cancelButtonText: "Cancel",
      cancelButtonColor: "#EF4444",
      confirmButtonText: "Delete",
      confirmButtonColor: "#22C55E",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      const { _id } = category;
      await axios.delete("/api/categories?id=" + _id);
      fetchCategories();
    }
  }

  function addProperty() {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  }

  function handlePropertyNameChange(index, property, newName) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }

  function handlePropertyValuesChange(index, property, newValues) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }

  function removeProperty(indexToRemove) {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }

  // Function to render table rows recursively
  const renderCategories = (category, level) => {
    const childCategories = categories.filter(
      (c) => c.parent?._id === category._id
    );

    const sortedChildCategories = childCategories.sort((a, b) => {
      if (a.name === b.name) {
        return 0;
      }
      return a.name < b.name ? -1 : 1;
    });

    const bgColorStyle = {
      backgroundColor: level === 0 ? "" : `rgba(0, 0, 0, 0.${level})`,
    };

    return (
      <React.Fragment key={category._id}>
        <tr style={bgColorStyle}>
          <td>{category._id}</td>
          <td>{category.name}</td>
          <td>{category?.parent?.name}</td>
          <td style={{ display: "flex", gap: "0.5rem" }}>
            <button
              className="btn-primary"
              onClick={() => editCategory(category)}
            >
              Edit
            </button>
            <button
              className="btn-primary"
              onClick={() => deleteCategory(category)}
            >
              Delete
            </button>
          </td>
        </tr>
        {sortedChildCategories.map((childCategory) =>
          renderCategories(childCategory, level + 1)
        )}
      </React.Fragment>
    );
  };

  return (
    <Layout>
      <h1>Categories</h1>
      <label>
        {editedCategory
          ? `Edit category ${editedCategory.name}`
          : "Create new category"}
      </label>
      <form onSubmit={saveCategory}>
        <div className="flex gap-1">
          <input
            type="text"
            placeholder={"Category name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            id="parent-dropdown"
            value={parentCategory || "0"}
            onChange={(e) => setParentCategory(e.target.value)}
          >
            <option value="0">No parent category</option>
            {categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block">Properties</label>
          <button
            type="button"
            className="btn-default text-sm mb-2"
            onClick={addProperty}
          >
            Add new property
          </button>
          {properties.length > 0 &&
            properties.map((property, index) => (
              <div className="flex gap-1 mb-2">
                <input
                  type="text"
                  className="mb-0"
                  value={property.name}
                  onChange={(e) =>
                    handlePropertyNameChange(index, property, e.target.value)
                  }
                  placeholder="property name (ex. color)"
                />
                <input
                  type="text"
                  className="mb-0"
                  value={property.values}
                  onChange={(e) =>
                    handlePropertyValuesChange(index, property, e.target.value)
                  }
                  placeholder="values, comma seperated"
                />
                <button
                  className="btn-cancel"
                  onClick={() => removeProperty(index)}
                  type="button"
                >
                  Remove
                </button>
              </div>
            ))}
        </div>
        <div className="flex gap-1">
          {editedCategory && (
            <button
              type="button"
              className="btn-cancel py-1"
              onClick={() => {
                setEditedCategory(null);
                setName("");
                setParentCategory("");
                setProperties("");
              }}
            >
              Cancel
            </button>
          )}
          <button type="submit" className="btn-confirm py-1">
            Save
          </button>
        </div>
      </form>
      {!editedCategory && (
        <table className="basic mt-4">
          <thead>
            <tr>
              <td>Id</td>
              <td>Category Name</td>
              <td>Parent category</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {categories
              .filter((category) => !category.parent)
              .map((category) => renderCategories(category, 0))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
