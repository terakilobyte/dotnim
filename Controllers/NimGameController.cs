using Microsoft.AspNetCore.Mvc;

namespace interview.Controllers;

[ApiController]
[Route("api/[controller]")]

public class NimGameController : ControllerBase
{

    private readonly ILogger<NimGameController> _logger;
    public NimGameController(ILogger<NimGameController> logger)
    {
        _logger = logger;
    }

    [HttpPost]

    public IActionResult Post([FromBody] Nimput nimput)
    {
        var choice = nimput.nim + nimput.choice % 4 != 0 ? 4 - (nimput.choice % 4) : Random.Shared.Next(1, 4);

        return Ok(new { nim = nimput.nim + nimput.choice + choice, choice = choice });
    }
}
