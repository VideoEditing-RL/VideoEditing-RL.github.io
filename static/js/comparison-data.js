// Comparison data for the page. Edit by hand: add or remove clips here, and
// keep the frame files under assets/frames/<dir>/<method>/sNNN.jpg in sync.
window.COMPARISON_DATA = {
  "base": "./assets/frames",
  "groups": [
    {
      "id": "small",
      "title": "Comparison with Models up to 5B",
      "note": "Our 5B model against baselines in the same size class."
    },
    {
      "id": "large",
      "title": "Comparison with Models from 13B",
      "note": "Our 14B model against the larger baselines."
    }
  ],
  "clips": [
    {
      "benchmark": "openve",
      "benchmarkLabel": "OpenVE-Bench",
      "dir": "openve/0054_global_style_Apply_the_Chinese_In",
      "category": "global_style",
      "clip": "0054_global_style_Apply_the_Chinese_In",
      "id": "0054",
      "instruction": "Apply Chinese Ink Wash Painting style with fluid brushstroke dynamics.",
      "slots": 8,
      "aspect": 1.7778,
      "methods": [
        {
          "name": "org",
          "label": "Input",
          "role": "input",
          "group": "input"
        },
        {
          "name": "kiwi",
          "label": "Kiwi-Edit",
          "role": "baseline",
          "group": "small"
        },
        {
          "name": "lucy",
          "label": "Lucy-Edit",
          "role": "baseline",
          "group": "small"
        },
        {
          "name": "omni",
          "label": "OmniVideo",
          "role": "baseline",
          "group": "small"
        },
        {
          "name": "our_5b",
          "label": "Ours (5B)",
          "role": "ours",
          "group": "small"
        }
      ]
    },
    {
      "benchmark": "openve",
      "benchmarkLabel": "OpenVE-Bench",
      "dir": "openve/0085_local_change_Replace_the_mans_ca",
      "category": "local_change",
      "clip": "0085_local_change_Replace_the_mans_ca",
      "id": "0085",
      "instruction": "Replace the man's casual shirt with a dark navy blue business suit, white shirt, and black tie.",
      "slots": 8,
      "aspect": 0.5625,
      "methods": [
        {
          "name": "org",
          "label": "Input",
          "role": "input",
          "group": "input"
        },
        {
          "name": "kiwi",
          "label": "Kiwi-Edit",
          "role": "baseline",
          "group": "small"
        },
        {
          "name": "lucy",
          "label": "Lucy-Edit",
          "role": "baseline",
          "group": "small"
        },
        {
          "name": "omni",
          "label": "OmniVideo",
          "role": "baseline",
          "group": "small"
        },
        {
          "name": "our_5b",
          "label": "Ours (5B)",
          "role": "ours",
          "group": "small"
        }
      ]
    },
    {
      "benchmark": "openve",
      "benchmarkLabel": "OpenVE-Bench",
      "dir": "openve/0113_local_change_Add_a_classic_brown",
      "category": "local_change",
      "clip": "0113_local_change_Add_a_classic_brown",
      "id": "0113",
      "instruction": "Add a classic brown fedora hat to the man.",
      "slots": 8,
      "aspect": 1.7778,
      "methods": [
        {
          "name": "org",
          "label": "Input",
          "role": "input",
          "group": "input"
        },
        {
          "name": "kiwi",
          "label": "Kiwi-Edit",
          "role": "baseline",
          "group": "small"
        },
        {
          "name": "lucy",
          "label": "Lucy-Edit",
          "role": "baseline",
          "group": "small"
        },
        {
          "name": "omni",
          "label": "OmniVideo",
          "role": "baseline",
          "group": "small"
        },
        {
          "name": "our_5b",
          "label": "Ours (5B)",
          "role": "ours",
          "group": "small"
        }
      ]
    },
    {
      "benchmark": "openve",
      "benchmarkLabel": "OpenVE-Bench",
      "dir": "openve/0204_local_remove_Remove_the_person_st",
      "category": "local_remove",
      "clip": "0204_local_remove_Remove_the_person_st",
      "id": "0204",
      "instruction": "Remove the person standing with a relaxed posture, wearing a patterned shirt and loose-fitting blue jeans, holding an object in their right hand.",
      "slots": 8,
      "aspect": 1.7778,
      "methods": [
        {
          "name": "org",
          "label": "Input",
          "role": "input",
          "group": "input"
        },
        {
          "name": "kiwi",
          "label": "Kiwi-Edit",
          "role": "baseline",
          "group": "small"
        },
        {
          "name": "lucy",
          "label": "Lucy-Edit",
          "role": "baseline",
          "group": "small"
        },
        {
          "name": "omni",
          "label": "OmniVideo",
          "role": "baseline",
          "group": "small"
        },
        {
          "name": "our_5b",
          "label": "Ours (5B)",
          "role": "ours",
          "group": "small"
        }
      ]
    },
    {
      "benchmark": "openve",
      "benchmarkLabel": "OpenVE-Bench",
      "dir": "openve/0251_local_add_Overlay_an_animated",
      "category": "local_add",
      "clip": "0251_local_add_Overlay_an_animated",
      "id": "0251",
      "instruction": "Add an animated white ceramic coffee mug to the desk near the keyboard.",
      "slots": 8,
      "aspect": 1.7778,
      "methods": [
        {
          "name": "org",
          "label": "Input",
          "role": "input",
          "group": "input"
        },
        {
          "name": "kiwi",
          "label": "Kiwi-Edit",
          "role": "baseline",
          "group": "small"
        },
        {
          "name": "lucy",
          "label": "Lucy-Edit",
          "role": "baseline",
          "group": "small"
        },
        {
          "name": "omni",
          "label": "OmniVideo",
          "role": "baseline",
          "group": "small"
        },
        {
          "name": "our_5b",
          "label": "Ours (5B)",
          "role": "ours",
          "group": "small"
        }
      ]
    },
    {
      "benchmark": "five",
      "benchmarkLabel": "FiVE-Bench",
      "dir": "five/0057_dog_edit5",
      "category": "",
      "clip": "0057_dog_edit5",
      "id": "0057",
      "instruction": "Add a crown to the head of the golden retriever sniffing the ground in the dry, grassy yard.",
      "slots": 8,
      "aspect": 1.7941,
      "methods": [
        {
          "name": "org",
          "label": "Input",
          "role": "input",
          "group": "input"
        },
        {
          "name": "kiwi",
          "label": "Kiwi-Edit",
          "role": "baseline",
          "group": "small"
        },
        {
          "name": "lucy",
          "label": "Lucy-Edit",
          "role": "baseline",
          "group": "small"
        },
        {
          "name": "omni",
          "label": "OmniVideo",
          "role": "baseline",
          "group": "small"
        },
        {
          "name": "our",
          "label": "Ours (5B)",
          "role": "ours",
          "group": "small"
        }
      ]
    },
    {
      "benchmark": "five",
      "benchmarkLabel": "FiVE-Bench",
      "dir": "five/0075_A_bicycle_edit2",
      "category": "",
      "clip": "0075_A_bicycle_edit2",
      "id": "0075",
      "instruction": "Replace the rolling bicycle with a skateboard gliding steadily along the cobblestone street lined with old buildings.",
      "slots": 8,
      "aspect": 1.7225,
      "methods": [
        {
          "name": "org",
          "label": "Input",
          "role": "input",
          "group": "input"
        },
        {
          "name": "kiwi",
          "label": "Kiwi-Edit",
          "role": "baseline",
          "group": "small"
        },
        {
          "name": "lucy",
          "label": "Lucy-Edit",
          "role": "baseline",
          "group": "small"
        },
        {
          "name": "omni",
          "label": "OmniVideo",
          "role": "baseline",
          "group": "small"
        },
        {
          "name": "our",
          "label": "Ours (5B)",
          "role": "ours",
          "group": "small"
        }
      ]
    },
    {
      "benchmark": "openve",
      "benchmarkLabel": "OpenVE-Bench",
      "dir": "openve/0023_global_style_Apply_the_Gongbi_ani",
      "category": "global_style",
      "clip": "0023_global_style_Apply_the_Gongbi_ani",
      "id": "0023",
      "instruction": "Apply Gongbi animation style with refined linework.",
      "slots": 8,
      "aspect": 0.5625,
      "methods": [
        {
          "name": "org",
          "label": "Input",
          "role": "input",
          "group": "input"
        },
        {
          "name": "ditto",
          "label": "DITTO",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "sama",
          "label": "SAMA",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "univideo",
          "label": "UniVideo",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "vino",
          "label": "VINO",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "our",
          "label": "Ours (14B)",
          "role": "ours",
          "group": "large"
        }
      ]
    },
    {
      "benchmark": "five",
      "benchmarkLabel": "FiVE-Bench",
      "dir": "five/0003_ocean-birds_edit1",
      "category": "",
      "clip": "0003_ocean-birds_edit1",
      "id": "0003",
      "instruction": "Replace the two white ibises walking along the sandy shore with white swans exploring the ground near the gentle waves.",
      "slots": 8,
      "aspect": 1.7941,
      "methods": [
        {
          "name": "org",
          "label": "Input",
          "role": "input",
          "group": "input"
        },
        {
          "name": "ditto",
          "label": "DITTO",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "sama",
          "label": "SAMA",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "univideo",
          "label": "UniVideo",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "vino",
          "label": "VINO",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "our14b",
          "label": "Ours (14B)",
          "role": "ours",
          "group": "large"
        }
      ]
    },
    {
      "benchmark": "five",
      "benchmarkLabel": "FiVE-Bench",
      "dir": "five/0011_lucia_edit4",
      "category": "",
      "clip": "0011_lucia_edit4",
      "id": "0011",
      "instruction": "Change the woman in the black dress walking along the paved path into a porcelain figure, set against the lush green park with trees and a wooden bench.",
      "slots": 8,
      "aspect": 1.7941,
      "methods": [
        {
          "name": "org",
          "label": "Input",
          "role": "input",
          "group": "input"
        },
        {
          "name": "ditto",
          "label": "DITTO",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "sama",
          "label": "SAMA",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "univideo",
          "label": "UniVideo",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "vino",
          "label": "VINO",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "our14b_l",
          "label": "Ours (14B)",
          "role": "ours",
          "group": "large"
        }
      ]
    },
    {
      "benchmark": "five",
      "benchmarkLabel": "FiVE-Bench",
      "dir": "five/0094_A_swan_edit2",
      "category": "",
      "clip": "0094_A_swan_edit2",
      "id": "0094",
      "instruction": "Replace the swimming swan with a paper boat floating gracefully across the still pond surrounded by reeds.",
      "slots": 8,
      "aspect": 1.7206,
      "methods": [
        {
          "name": "org",
          "label": "Input",
          "role": "input",
          "group": "input"
        },
        {
          "name": "ditto",
          "label": "DITTO",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "sama",
          "label": "SAMA",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "univideo",
          "label": "UniVideo",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "vino",
          "label": "VINO",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "our14b_l",
          "label": "Ours (14B)",
          "role": "ours",
          "group": "large"
        }
      ]
    },
    {
      "benchmark": "five",
      "benchmarkLabel": "FiVE-Bench",
      "dir": "five/0098_A_squirrel_edit4",
      "category": "",
      "clip": "0098_A_squirrel_edit4",
      "id": "0098",
      "instruction": "Change the squirrel perched on the tree branch into a knitted texture while it nibbles on a nut in the quiet forest.",
      "slots": 8,
      "aspect": 1.7206,
      "methods": [
        {
          "name": "org",
          "label": "Input",
          "role": "input",
          "group": "input"
        },
        {
          "name": "ditto",
          "label": "DITTO",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "sama",
          "label": "SAMA",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "univideo",
          "label": "UniVideo",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "vino",
          "label": "VINO",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "our14b",
          "label": "Ours (14B)",
          "role": "ours",
          "group": "large"
        }
      ]
    },
    {
      "benchmark": "five",
      "benchmarkLabel": "FiVE-Bench",
      "dir": "five/0041_longboard_edit1",
      "category": "",
      "clip": "0041_longboard_edit1",
      "id": "0041",
      "instruction": "Replace the man in the yellow shirt riding the longboard with an astronaut in a yellow shirt on the paved path.",
      "slots": 8,
      "aspect": 1.7941,
      "methods": [
        {
          "name": "org",
          "label": "Input",
          "role": "input",
          "group": "input"
        },
        {
          "name": "ditto",
          "label": "DITTO",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "sama",
          "label": "SAMA",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "univideo",
          "label": "UniVideo",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "vino",
          "label": "VINO",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "our",
          "label": "Ours (14B)",
          "role": "ours",
          "group": "large"
        }
      ]
    },
    {
      "benchmark": "five",
      "benchmarkLabel": "FiVE-Bench",
      "dir": "five/0042_gym-ball_edit2",
      "category": "",
      "clip": "0042_gym-ball_edit2",
      "id": "0042",
      "instruction": "Replace the man lifting the heavy gym ball above his head with a panda performing the same controlled workout in the modern gym.",
      "slots": 8,
      "aspect": 1.7941,
      "methods": [
        {
          "name": "org",
          "label": "Input",
          "role": "input",
          "group": "input"
        },
        {
          "name": "ditto",
          "label": "DITTO",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "sama",
          "label": "SAMA",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "univideo",
          "label": "UniVideo",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "vino",
          "label": "VINO",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "our",
          "label": "Ours (14B)",
          "role": "ours",
          "group": "large"
        }
      ]
    },
    {
      "benchmark": "five",
      "benchmarkLabel": "FiVE-Bench",
      "dir": "five/0055_pigs_edit2",
      "category": "",
      "clip": "0055_pigs_edit2",
      "id": "0055",
      "instruction": "Replace the group of foraging pigs on the dirt ground with a large robotic dragon and two smaller ones moving around each other.",
      "slots": 8,
      "aspect": 1.7941,
      "methods": [
        {
          "name": "org",
          "label": "Input",
          "role": "input",
          "group": "input"
        },
        {
          "name": "ditto",
          "label": "DITTO",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "sama",
          "label": "SAMA",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "univideo",
          "label": "UniVideo",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "vino",
          "label": "VINO",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "our",
          "label": "Ours (14B)",
          "role": "ours",
          "group": "large"
        }
      ]
    },
    {
      "benchmark": "five",
      "benchmarkLabel": "FiVE-Bench",
      "dir": "five/0088_A_cyclist_edit4",
      "category": "",
      "clip": "0088_A_cyclist_edit4",
      "id": "0088",
      "instruction": "Replace the vigorously pedaling cyclist on the tree-lined city park path with a flat cardboard cutout of the cyclist.",
      "slots": 8,
      "aspect": 1.7206,
      "methods": [
        {
          "name": "org",
          "label": "Input",
          "role": "input",
          "group": "input"
        },
        {
          "name": "ditto",
          "label": "DITTO",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "sama",
          "label": "SAMA",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "univideo",
          "label": "UniVideo",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "vino",
          "label": "VINO",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "our",
          "label": "Ours (14B)",
          "role": "ours",
          "group": "large"
        }
      ]
    },
    {
      "benchmark": "five",
      "benchmarkLabel": "FiVE-Bench",
      "dir": "five/0089_A_dog_edit4",
      "category": "",
      "clip": "0089_A_dog_edit4",
      "id": "0089",
      "instruction": "Replace the wagging dog sitting on the sandy beach with a plush dog, keeping its joyful expression against the crashing waves.",
      "slots": 8,
      "aspect": 1.7206,
      "methods": [
        {
          "name": "org",
          "label": "Input",
          "role": "input",
          "group": "input"
        },
        {
          "name": "ditto",
          "label": "DITTO",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "sama",
          "label": "SAMA",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "univideo",
          "label": "UniVideo",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "vino",
          "label": "VINO",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "our",
          "label": "Ours (14B)",
          "role": "ours",
          "group": "large"
        }
      ]
    }
  ],
  "videoBase": "./assets/comparison",
  "videos": [
    {
      "dir": "0007_guitar-violin_edit1",
      "benchmark": "five",
      "benchmarkLabel": "FiVE-Bench",
      "category": "",
      "clip": "0007_guitar-violin_edit1",
      "id": "0007",
      "instruction": "Replace the passionate violinist in the rustic stone room with a robot playing the violin, while the seated guitarist remains nearby.",
      "methods": [
        {
          "name": "org",
          "label": "Input",
          "role": "input",
          "group": "input"
        },
        {
          "name": "ditto",
          "label": "DITTO",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "kiwi",
          "label": "Kiwi-Edit",
          "role": "baseline",
          "group": "small"
        },
        {
          "name": "lucy",
          "label": "Lucy-Edit",
          "role": "baseline",
          "group": "small"
        },
        {
          "name": "omni",
          "label": "OmniVideo",
          "role": "baseline",
          "group": "small"
        },
        {
          "name": "sama",
          "label": "SAMA",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "univideo",
          "label": "UniVideo",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "vino",
          "label": "VINO",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "our",
          "label": "Ours (5B)",
          "role": "ours",
          "group": "small"
        }
      ]
    },
    {
      "dir": "global_style/0022_global_style_Apply_the_dawn_aesth",
      "benchmark": "openve",
      "benchmarkLabel": "OpenVE-Bench",
      "category": "global_style",
      "clip": "0022_global_style_Apply_the_dawn_aesth",
      "id": "0022",
      "instruction": "Apply dawn aesthetic style with warm orange and pink skies.",
      "methods": [
        {
          "name": "org",
          "label": "Input",
          "role": "input",
          "group": "input"
        },
        {
          "name": "ditto",
          "label": "DITTO",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "kiwi",
          "label": "Kiwi-Edit",
          "role": "baseline",
          "group": "small"
        },
        {
          "name": "lucy",
          "label": "Lucy-Edit",
          "role": "baseline",
          "group": "small"
        },
        {
          "name": "omni",
          "label": "OmniVideo",
          "role": "baseline",
          "group": "small"
        },
        {
          "name": "sama",
          "label": "SAMA",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "univideo",
          "label": "UniVideo",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "vino",
          "label": "VINO",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "our",
          "label": "Ours (5B)",
          "role": "ours",
          "group": "large"
        }
      ]
    },
    {
      "dir": "local_remove/0236_local_remove_Remove_the_person_wi",
      "benchmark": "openve",
      "benchmarkLabel": "OpenVE-Bench",
      "category": "local_remove",
      "clip": "0236_local_remove_Remove_the_person_wi",
      "id": "0236",
      "instruction": "Remove the person with short, curly hair in a dynamic pose wearing a dark long-sleeved shirt.",
      "methods": [
        {
          "name": "org",
          "label": "Input",
          "role": "input",
          "group": "input"
        },
        {
          "name": "ditto",
          "label": "DITTO",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "kiwi",
          "label": "Kiwi-Edit",
          "role": "baseline",
          "group": "small"
        },
        {
          "name": "lucy",
          "label": "Lucy-Edit",
          "role": "baseline",
          "group": "small"
        },
        {
          "name": "omni",
          "label": "OmniVideo",
          "role": "baseline",
          "group": "small"
        },
        {
          "name": "sama",
          "label": "SAMA",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "univideo",
          "label": "UniVideo",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "vino",
          "label": "VINO",
          "role": "baseline",
          "group": "large"
        },
        {
          "name": "our",
          "label": "Ours (5B)",
          "role": "ours",
          "group": "large"
        }
      ]
    }
  ]
};
