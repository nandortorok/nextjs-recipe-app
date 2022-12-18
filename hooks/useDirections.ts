import { UploadContext } from "lib/contexts";
import { useContext, ChangeEvent } from "react";

const useDirections = () => {
  const { sections, setSections } = useContext(UploadContext);

  const handleChange =
    (sectionId: number, directionId: number) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      const newSections = sections.map((section, sectionIdx) => {
        if (sectionIdx === sectionId) {
          const newDirections = section.directions.map((direction, idx) => {
            if (idx === directionId) {
              return value;
            } else {
              return direction;
            }
          });

          return {
            ...section,
            directions: newDirections,
          };
        } else {
          return section;
        }
      });

      setSections(newSections);
    };

  const handleDelete = (sectionId: number, directionId: number) => {
    const newSection = sections.map((section, sectionIdx) => {
      if (sectionIdx === sectionId) {
        const newDirections = section.directions.filter((direction, idx) => {
          return idx !== directionId;
        });

        return {
          ...section,
          directions: newDirections,
        };
      } else {
        return section;
      }
    });

    setSections(newSection);
  };

  const handleAddDirection = (sectionId: number) => {
    const newSections = sections.map((section, sectionIDx) => {
      if (sectionIDx === sectionId) {
        return {
          ...section,
          directions: [...section.directions, ""],
        };
      } else {
        return section;
      }
    });

    setSections(newSections);
  };

  return {
    sections,
    handleChange,
    handleDelete,
    handleAddDirection,
  };
};

export default useDirections;
