export const handleFormData = (
  event: React.FormEvent<HTMLFormElement>
): Record<string, string> => {
  event.preventDefault();
  return (
    Array.from(event.currentTarget.elements) as HTMLInputElement[]
  ).reduce<Record<string, string>>((prev, curr) => {
    if (curr.name) {
      // eslint-disable-next-line no-param-reassign
      prev[curr.name] = curr.value;
    }
    return prev;
  }, {});
};

export default { handleFormData };
