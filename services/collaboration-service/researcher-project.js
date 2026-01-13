router.post('/', async (req, res) => {
  const { researcherId, projectId, relationType } = req.body;
  if (!researcherId || !projectId || !relationType) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    await createResearcherProjectRelation(researcherId, projectId, relationType);
    res.status(201).json({ message: "Relation created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create relation" });
  }
});
