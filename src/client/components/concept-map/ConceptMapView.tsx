import { useEffect, useMemo, useCallback } from 'react';
import ReactFlow, {
  type Node,
  type Edge,
  Controls,
  Background,
  BackgroundVariant,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { ConceptNode, getConceptStatus, type ConceptNodeData } from './ConceptNode';
import type { ConceptMapData, ConceptWithMastery } from '../../../types/api';

const nodeTypes = { concept: ConceptNode };

interface ConceptMapViewProps {
  data: ConceptMapData;
  onNodeSelect: (concept: ConceptWithMastery | null) => void;
}

function buildLayout(data: ConceptMapData) {
  const horizontalSpacing = 340;
  const verticalSpacing = 110;

  // Group concepts by category, preserving display_order within each
  const categoryGroups = new Map<string, ConceptWithMastery[]>();
  for (const concept of data.concepts) {
    const group = categoryGroups.get(concept.category) ?? [];
    group.push(concept);
    categoryGroups.set(concept.category, group);
  }

  // Use the category order from the API (which matches curriculum progression)
  const orderedCategories = data.categories.filter(c => categoryGroups.has(c));

  const nodes: Node<ConceptNodeData>[] = [];
  const edges: Edge[] = [];

  // Create nodes positioned by category column + row within category
  orderedCategories.forEach((category, catIndex) => {
    const concepts = categoryGroups.get(category)!;
    concepts.forEach((concept, conceptIndex) => {
      const status = getConceptStatus(concept);
      nodes.push({
        id: concept.id,
        type: 'concept',
        position: {
          x: catIndex * horizontalSpacing,
          y: conceptIndex * verticalSpacing,
        },
        data: { concept, status },
      });
    });
  });

  // Create edges from prerequisites
  for (const concept of data.concepts) {
    for (const prereqId of concept.prerequisites) {
      edges.push({
        id: `${prereqId}->${concept.id}`,
        source: prereqId,
        target: concept.id,
        type: 'smoothstep',
        animated: !concept.isLocked,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 16,
          height: 16,
        },
        style: {
          stroke: concept.isLocked ? '#9ca3af' : '#3b82f6',
          strokeWidth: 1.5,
        },
      });
    }
  }

  return { nodes, edges };
}

export function ConceptMapView({ data, onNodeSelect }: ConceptMapViewProps) {
  const layout = useMemo(() => buildLayout(data), [data]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    setNodes(layout.nodes);
    setEdges(layout.edges);
  }, [layout, setNodes, setEdges]);

  const handleNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node<ConceptNodeData>) => {
      onNodeSelect(node.data.concept);
    },
    [onNodeSelect],
  );

  const handlePaneClick = useCallback(() => {
    onNodeSelect(null);
  }, [onNodeSelect]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={handleNodeClick}
      onPaneClick={handlePaneClick}
      nodeTypes={nodeTypes}
      fitView
      fitViewOptions={{ padding: 0.15 }}
      minZoom={0.1}
      maxZoom={1.5}
      attributionPosition="bottom-left"
    >
      <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
      <Controls showInteractive={false} />
      <MiniMap
        nodeStrokeWidth={3}
        zoomable
        pannable
        className="!bg-card !border-border"
      />
    </ReactFlow>
  );
}
